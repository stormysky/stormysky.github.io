---
layout: post
title: Snaker
description: "A Ez HTML game"
modified: 2018-01-20
tags: [canvas, js, snake]
comments: false
image:
  feature: abstract-10.jpg
  credit: 
  creditlink: 
---


# 贪吃蛇 #

**操作方法：**

 - 上下左右滑动屏幕控制方向

<div class = "main">
	<div class="only">
		<div class = "data">
			<p>score:</p>
			<p id = "scores">0</p>
			<span id = "control" ></span>
		</div>
		<div id="container">
			<div id = "controlText">pause</div>
			<canvas id = "drawenv" style="width:100%;height:100%;">
				your broswer didn't surport canvas
			</canvas>
		</div>
	</div>
</div>
<script src="{{ site.url }}/assets/js/demo/snake.js"></script>

[项目地址](https://github.com/stormysky/snaker)


 **版本v1.0**    - 2018-01-08

支持键盘触屏操作，贪吃蛇超过屏幕外或碰到蛇身游戏结束。

 **版本v1.1**    - 2018-01-13

修改部分bug，增加游戏放大缩小操作

 **版本v1.1**    - 2018-01-20

修复暂停游戏也能操作方向