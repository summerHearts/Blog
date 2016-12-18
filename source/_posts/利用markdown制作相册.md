---
title: 利用markdown制作相册
date: 2016-12-16 23:37:20
tags: markdwon
category: 信息技术
---

windows平台下得使用excel。
1. 首先批量命名图片，并在命令行下重命名。

| ="1 ("&ROW()&").jpg" | ="ren """&A1&""" "&ROW()&".jpg" |
|----------------------|---------------------------------|
| 1 (1).jpg  | ren "1 (1).jpg" 1.jpg   |
| 1 (2).jpg  | ren "1 (2).jpg" 2.jpg   |
| 1 (3).jpg  | ren "1 (3).jpg" 3.jpg   |
| 1 (4).jpg  | ren "1 (4).jpg" 4.jpg   |
| 1 (5).jpg  | ren "1 (5).jpg" 5.jpg   |
| 1 (6).jpg  | ren "1 (6).jpg" 6.jpg   |
| 1 (7).jpg  | ren "1 (7).jpg" 7.jpg   |
| 1 (8).jpg  | ren "1 (8).jpg" 8.jpg   |
| 1 (9).jpg  | ren "1 (9).jpg" 9.jpg   |
| 1 (10).jpg | ren "1 (10).jpg" 10.jpg |
2. 使用excel行列转换功能，比如每行三张图片，以表格形式展现。
```
="!["&ROW()&"](./images/2014/07/139fuguang/"&ROW()&".jpg)" //纵向拖动 
=OFFSET($A$1,(ROW()-1)*3+COLUMN()-7,0) //矩阵填充
```                                  
3. 放图片目录与md平级可以进行预览了。

4. 生成静态页面并git push。


