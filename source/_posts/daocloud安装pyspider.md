---
title: daocloud安装pyspider
date: 2017-8-2 21:35:40
tags: pyspider,docker
category: 信息技术
---
```
phantomjs:
  image: binux/pyspider:latest
  command: phantomjs
  cpu_shares: 512
  environment:
  - EXCLUDE_PORTS=5000,23333,24444
  expose:
  - '25555'
  mem_limit: 512m
  restart: always
phantomjs-lb:
  image: dockercloud/haproxy:latest
  links:
  - phantomjs
  restart: always
fetcher:
  image: binux/pyspider:latest
  links:
  - phantomjs-lb:phantomjs
  command: --message-queue "redis://pyredis:6379/1" --phantomjs-proxy "phantomjs:80"
    fetcher --xmlrpc
  cpu_shares: 512
  environment:
  - EXCLUDE_PORTS=5000,25555,23333
  external_links:
  - dao_redis_1:pyredis
  mem_limit: 128m
  restart: always
fetcher-lb:
  image: dockercloud/haproxy:latest
  links:
  - fetcher
  restart: always
processor:
  image: binux/pyspider:latest
  command: --projectdb "mysql+projectdb://root:deffyc126@dao_pymysql_1/projectdb"
    --message-queue "redis://pyredis:6379/1"
  cpu_shares: 512
  mem_limit: 256m
  external_links:
  - dao_pymysql_1
  - dao_redis_1:pyredis
  restart: always
result-worker:
  image: binux/pyspider:latest
  command: --taskdb "mysql+taskdb://root:deffyc126@dao_pymysql_1:3306/taskdb"  --projectdb
    "mysql+projectdb://root:deffyc126@dao_pymysql_1:3306/projectdb" --resultdb "mysql+resultdb://root:deffyc126@dao_pymysql_1:3306/resultdb"
    --message-queue "redis://pyredis:6379/1"
  cpu_shares: 512
  mem_limit: 256m
  external_links:
  - dao_pymysql_1
  - dao_redis_1:pyredis
  restart: always
scheduler:
  image: binux/pyspider:latest
  command: --taskdb "mysql+taskdb://root:deffyc126@dao_pymysql_1/taskdb" --resultdb
    "mysql+resultdb://root:deffyc126@dao_pymysql_1/resultdb" --projectdb "mysql+projectdb://root:deffyc126@dao_pymysql_1/projectdb"
    --message-queue "redis://pyredis:6379/1" scheduler --inqueue-limit 5000 --xmlrpc
    --delete-time 43200
  external_links:
  - dao_pymysql_1
  - dao_redis_1:pyredis
webui:
  image: binux/pyspider:latest
  command: --taskdb "mysql+taskdb://root:deffyc126@pymysql/taskdb"  --projectdb "mysql+projectdb://root:deffyc126@pymysql/projectdb"
    --resultdb "mysql+resultdb://root:deffyc126@pymysql/resultdb" --message-queue
    "redis://pyredis:6379/1" webui --max-rate 0.2 --max-burst 3 --scheduler-rpc "http://scheduler:23333/"
    --fetcher-rpc "http://fetcher:24444/" --username "deffyc" --password "deffyc126"
    --need-auth
  cpu_shares: 512
  environment:
  - EXCLUDE_PORTS=24444,25555,23333
  links:
  - fetcher-lb:fetcher
  - scheduler
  external_links:
  - dao_pymysql_1:pymysql
  - dao_redis_1:pyredis
  mem_limit: 256m
  restart: always
webui-lb:
  image: dockercloud/haproxy:latest
  links:
  - webui
  restart: always
nginx:
  image: daocloud.io/library/nginx:stable
  links:
  - webui-lb:HAPROXY
  ports:
  - 0.0.0.0:80:80
  - 0.0.0.0:443:443
  volumes:
  - /root/profile/nginx/nginx.conf:/etc/nginx/nginx.conf
  - /root/profile/nginx/conf.d/:/etc/nginx/conf.d/
  restart: always

```
docker-compose scale phantomjs=2 processor=2 webui=4


