---
layout: post
title: CSS3载入特效 charpter1
description: "css载入特效-第一部分"
modified: 2018-01-29
tags: [css,html]
comments: false
image:
  feature: 
  credit: 
  creditlink: 
---

## Part1 准备工作

一个特效基本构成有以下两点：
	
	1. 构成特效基本元素，例如原点、线条、图案或者多种组合等
	2. 动画效果，实现基本元素的运动

>那么接下来就需要按照步骤进行,以下面的加载效果为例


<link rel="stylesheet"  href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
	#bg{
		position: relative;
		text-align: center;
		height: 100px;

	}
	.ball:after{
		content:'\f013';
		font-family: FontAwesome;
	}
	.ball{
		position: absolute;
		width: 80px;
		height: 80px;
	}
	.ball:nth-child(1){
		animation: rota 2s 1000ms infinite ease-in-out;
	}
	.ball:nth-child(2){
		animation: rota 2s 800ms infinite ease-in-out;
	}
	.ball:nth-child(3){
		animation: rota 2s 600ms infinite ease-in-out;
	}
	.ball:nth-child(4){
		animation: rota 2s 400ms infinite ease-in-out;
	}
	.ball:nth-child(5){
		animation: rota 2s 200ms infinite ease-in-out;
	}
	@keyframes rota{
		0%{transform: rotate(0deg);}
		100%{transform: rotate(360deg);}

	}
</style>
<div id ="bg">
	<div class="ball"></div>
	<div class="ball"></div>
	<div class="ball"></div>
	<div class="ball"></div>
	<div class="ball"></div>
</div>
<br/>



## Part2 特效基本元素准备

例如我们需要原点作为基本元素

1. 可以使用设置了border-radius的div来作为基本元素
2. 使用一个icon来作为基本元素

第一种较为简单，第二种可以使用FontAwesome等图标字体库来实现
这里介绍下第二种方法

```html
	
	<!-- html代码 -->
	<div id ="bg">
		<div class="ball"></div>
		<div class="ball"></div>
		<div class="ball"></div>
		<div class="ball"></div>
		<div class="ball"></div>
	</div>
```

```css

	/*css代码*/
	#bg{
		position: relative;
		text-align: center;
		height: 100px;
	}
	.ball:after{
		content:'\f013';		/*使用字库代码,可随意改变*/
		font-family: FontAwesome;	/*使用字库*/
	.ball{
		position: absolute;
		width: 80px;
		height: 80px;
	}

```
>[FontAwesome](http://fontawesome.io/)中的[字体代码库](http://www.bootcss.com/p/font-awesome/design.html)或者直接用相关FontAwesome的类，官网中有栗子

基本元素有了，接下来就要有动画效果



## Part3 动画效果

>使用css3的animation，@keyframes就可以搞定

思路：图案逐个旋转，设置延迟不同，从0度旋转至360度，ease-in-out保证开始和结束较过程中缓慢些。
也可以通过过程改变旋转速度达到不同效果，代码如下：

```css
	
		.ball:nth-child(1){
			animation: rota 2s 1000ms infinite ease-in-out;
		}
		.ball:nth-child(2){
			animation: rota 2s 800ms infinite ease-in-out;
		}
		.ball:nth-child(3){
			animation: rota 2s 600ms infinite ease-in-out;
		}
		.ball:nth-child(4){
			animation: rota 2s 400ms infinite ease-in-out;
		}
		.ball:nth-child(5){
			animation: rota 2s 200ms infinite ease-in-out;
		}
		@keyframes rota{
			0%{transform: rotate(0deg);}
			100%{transform: rotate(360deg);}

		}
```



