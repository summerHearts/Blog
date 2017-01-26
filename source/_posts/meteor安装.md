---
title: meteor安装
date: 2017-1-25 2:40:7
tags: meteor
category: 信息技术
---

# 1. 安装
若
```
//ps:1.4.2 linux：http://blogstatic.ccsyue.com/meteor.install.sh | sh
curl https://install.meteor.com/ | sh
//分两步
curl https://install.meteor.com/ > meteor.install.sh
//修改135行左右软件包地址为：
TARBALL_URL="https://d3sqy0vbqsdhku.cloudfront.net/packages-bootstrap/${RELEASE}/meteor-bootstrap-${PLATFORM}.tar.gz"
//ps:最新版已下载至 http://blogstatic.ccsyue.com/packages-bootstrap/1.4.2.3/meteor-bootstrap-os.linux.x86_64.tar.gz

http://blogstatic.ccsyue.com/packages-bootstrap/${RELEASE}/meteor-bootstrap-${PLATFORM}.tar.gz
```
# 2. npm镜像替换
```
meteor npm config set registry http://registry.npm.taobao.org/
```

# 3. IDE 安装

https://code.visualstudio.com/
https://atom.io/
c9

# 4. meteor不能在root下运行
无法欺骗meteor：修改/etc/passwd,/etc/shadow下的第一个root字符串为自定义用户名
adduser 用户名
若添加了用户名记得修改 /etc/sudoers 
或者 ：usermod -aG sudo 用户名

