---
title: 使用docloud搭建c9 ide 
date: 2017-1-26 21:35:43
tags: webide
category: 信息技术
---

GFW 这道墙让meteor安装变成了一件头疼的事情。如果你有一个可用来安装docker的linux服务器。不如试试docloud来搭建一个WEB IDE
Coding webide 的社区版docker，没弄成功。。。。

# daocloud 设置
> 使用镜像：index.docker.io/deffyc/c9:v0.1 ，搜索deffyc/c9.

| 基础项  | 容器->主机                                        | 描述                                                                   |
|--------|-----------------------------------------------|----------------------------------------------------------------------|
| 端口     | 3000->3000,8080->80                           | 3000端口用来跑meteor应用，8080端口来启动c9（80端口得用sudo，这样c9中的终端就是root，不利于meteor开发） |
| volumn | /home/c9/workspace->/home/rootadmin/workspace | docker默认会创建用户：c9 ，密码：rules，而/home/rootadmin/workspace是宿主机的工作目录       |
| 环境变量：  | $user->c9,$pass->rules,$LC_ALL->C        | 去本地化                                       |

# docker设置
1. 访问宿主机域名即可访问webide，使用环境变量$user,$pass登录。
之后： source /home/c9/.bashrc 生效
2.接下来生成SSH keys，添加到github或coding或码云中。
3.开启编辑之旅吧。记得github中的c9/core 安装于/home/c9/c9sdk目录下
# 端口的一些探索
360网站卫士和百度匀加速似乎是不支持非80端口访问宿主机3000端口的。
而 dnspod 目前测试来看是支持http://域名:端口访问的。因docker proxy 占用了3000端口，nginx反代似乎不能用了，改环境变量里的8080->8080，用nginx反代即可，贴出配置供参考。

nginx websocket反代注意：
[nginx websocket document][1]
···
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    server {
        ...

        location /chat/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }
    }
···


  [1]: http://nginx.org/en/docs/http/websocket.html