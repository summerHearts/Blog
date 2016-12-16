---
title: git快速上传下载
date: 2016-12-17 0:8:29
tags: web工具箱
category: git笔记
---

#前提
 1. 必须生成密钥（私钥、公钥），并将公钥C:\Users\Administrator\.ssh下的id_rsa.pub文本粘贴到git服务器(码云、github)上。
 2. ssh-keygen -t rsa -C "youremail@example.com"  windows下ssh-keygen地址：
C:\Program Files\Git\usr\bin

#下载
git clone git@git.oschina.net:jiehou/baihuayuan.git
git pull baihuayuan src:master

#上传 (强推）
 1. 新建远程仓库 git@git.oschina.net:jiehou/baihuayuan.git
 2. 给本地仓库初始化 git init
 3. 对应本地仓库到远程仓库 git remote add baihuayuan git@git.oschina.net:jiehou/baihuayuan.git
 4. 将本地仓库文件添加、提交。git add * ;git commit -m "upload all"
 5. 强推：git push -u baihuayuan master:src -f


```
mkdir jiehou
cd jiehou
git init
echo "# net:jiehou" >> README.md
git add README.md
git commit -m "first commit"
git remote add origin git@git.oschina.net:jiehou/baihuayuan.git
git push -u origin master
```
