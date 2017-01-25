---
title: meteor安装
date: 2017-1-25 2:40:7
tags: meteor
category: meteor
---

# 1. 安装
若
```
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

# 3. vs code 安装

https://code.visualstudio.com/


