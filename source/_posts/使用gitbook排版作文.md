---
title: 使用gitbook排版作文
date: 2016-12-13 17:54:53
tags: gitbook样式
category: gitbook笔记
---

> 插件帮不上啥忙，还得改源代码。需求格式：


![格式需求](/images/2016/12/gitbook-demo.png)

推荐入门教程：[GitBook的安装配置](http://gitbook.zhangjikai.com/commands.html)

##安装

 - nodejs 
 - npm install -g cnpm --registry=https://registry.npm.taobao.org 淘宝镜像 cnpm 
 - cnpm install -g gitbook_cli  -g //版本管理工具
 - 可以试试官方的[桌面版编辑器](https://www.gitbook.com/editor/) ，我用的[看云](http://www.kancloud.cn/) 再用git clone到本地。够麻烦的了。
 
##配置

 - 单回车分段落。因为想实现段落单回车搞定，所以还得修改一个源文件。路径如下：
 > .gitbook\versions\3.2.2\node_modules\gitbook-markdown\node_modules\kramed\lib\rules\block.js 
```javascript
paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def|math))+)\n*/,
```
修改为：
```javascript
paragraph: /^((?:[^\n]+?(?!hr|heading|lheading|blockquote|tag|def|math))+)\n*/,
```
注意我去掉了一个\n

 - 标题居中等

```css
#markdown {
  font-family: SimHei, arial, sans-serif;
  font-size: 24px;
  line-height: 1.5;
}
h1, h2, h3, h4, h5, h6 {
  text-align:center;
}
```

 - 段首缩进两个字符

```css
p{
  text-indent: 2em; 
}
```
 - 图片居中等，自己还得看着办。