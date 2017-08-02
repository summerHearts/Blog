---
title: 云服务器实现https访问
date: 2017-8-2 21:43:24
tags: Let's Encrypt,https
category: 信息技术
---
1. 申请证书(需要python和openssl支持)
```bash
#0.进入/etc/nginx/conf.d/目录
cd /etc/nginx/conf.d
#1.创建一个 Let's Encrypt账户私钥，以便让其识别你的身份
openssl genrsa 4096 > account.key
#2.创建域名私钥
openssl genrsa 4096 > domain.key
#3-1.单域名CSR用如下命令
openssl req -new -sha256 -key domain.key -subj "/CN=ccsyue.com" > domain.csr
#3-2.多域名CSR用如下命令（一般都至少要为根域和WWW申请证书吧）
openssl req -new -sha256 -key domain.key -subj "/" -reqexts SAN -config <(cat /etc/pki/tls/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:ccsyue.com,DNS:c.ccsyue.com")) > domain.csr
#4.创建验证目录/etc/nginx/conf.d/challenges/
python acme_tiny.py --account-key account.key --csr domain.csr --acme-dir ./challenges/ > signed.crt
#5.用nginx得合并中间证书
wget -O - https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem > intermediate.pem
cat signed.crt intermediate.pem > chained.pem
```
2.配置nginx,注意在1.4首次验证域名时暂时去掉server{listen:443...},之后又加上，当然得nginx restart或reload。
```
server {
    listen 80;
    server_name c.ccsyue.com ccsyue.com;
    location ^~ /.well-known/acme-challenge/ {
        alias /etc/nginx/conf.d/challenges/;
        try_files $uri =404;
    }
    location / {
        rewrite ^/(.*)$ https://ccsyue.com/$1 permanent;
    }
}
server {  
  listen 443;
  server_name c.ccsyue ccsyue.com;

  # SSL  
   ssl on;  
   ssl_certificate /etc/nginx/conf.d/chained.pem;
   ssl_certificate_key /etc/nginx/conf.d/domain.key;  
   ssl_session_timeout 1d;
   ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
   ssl_prefer_server_ciphers on;
ssl_ciphers                EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets      on;
ssl_stapling      on;
ssl_stapling_verify      on;
resolver                 114.114.114.114 valid=300s;
resolver_timeout         10s;
   # disable any limits to avoid HTTP 413 for large image uploads  
  client_max_body_size 0;  

  # required to avoid HTTP 411: see Issue #1486 (https://github.com/docker/docker/issues/1486)  
  chunked_transfer_encoding on;  

  location / {  
    # Do not allow connections from docker 1.5 and earlier  
    # docker pre-1.6.0 did not properly set the user agent on ping, catch "Go *" user agents  
    if ($http_user_agent ~ "^(docker\/1\.(3|4|5(?!\.[0-9]-dev))|Go ).*$" ) {  
      return 404;  
    }  
	
    # To add basic authentication to v2 use auth_basic setting plus add_header  
    # auth_basic "registry.localhost";  
    # auth_basic_user_file /etc/nginx/conf.d/registry.password;  
    # add_header 'Docker-Distribution-Api-Version' 'registry/2.0' always;  

    proxy_pass                          http://HAPROXY;  
    proxy_set_header  Host              $http_host;   # required for docker client's sake  
    proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP  
    proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;  
    proxy_set_header  X-Forwarded-Proto $scheme;  
    proxy_read_timeout                  900;  
  }  

}  
```

3.定期执行renew_cert.sh
```bash
#!/bin/bash

cd /root/profile/nginx/conf.d/
python acme_tiny.py --account-key account.key --csr domain.csr --acme-dir ./challenges/ > signed.crt || exit
wget -O - https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem > intermediate.pem
cat signed.crt intermediate.pem > chained.pem
docker restart 3e4430f588eb
```
```
0 0 1 * * /home/xxx/renew_cert.sh >/dev/null 2>&1
```