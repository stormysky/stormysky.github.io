---
layout: post
title: jQuery 和 原生DOM
description: ""
modified: 2018-01-25
tags: [javascript,JQuery]
comments: false
image:
  feature: 
  credit: 
  creditlink: 
---

## Part1 元素,元素属性，CSS属性

### 元素获取方法：

**1. 原生DOM方法：**

```javascript
	document.getElementById("id");
	document.getElementsByTagName("tags");
	document.getElementsByClassName("class");
```

**2. JQuery方法：**

		$("#id")
		$("tags")
		$(".class")

**JQuery优点：**

>1. JQuery代码较短提高效率。并且选择对象只需要像css选择器一样即可
>2. 原生DOM没有对应元素节点时会抛出错误，JQuery则不会




### 元素属性方法：

**1. 原生DOM方法：**

```javascript
	var object = document.getElementById("div");	// 获取id为div的元素节点

	object.getAttribute("id");			// 获取object的id属性
	object.setAttribute("title","123");		// 设置属性title
```

**2. JQuery方法：**

```javascript
	$("#div").attr("id");				// 获取id为div的元素节点的id属性
	$("#div").attr("title","123");			// 设置属性title
	$("#div").attr({
		src = "div.png",
		alt = "a picture"
	})						// 可以设置多个属性
	$("a").attr("href",function(){...});		// 可以通过函数批量处理

	$("a").removeAttr("href");			// 删除所有a节点的href属性
```

**JQuery优点：**

>比原生方法简洁，并且增加了部分方法，如：可使用函数，可以删除属性




-------
### CSS方法：

**1. 原生DOM方法：**

```javascript
	//只能获取元素的style属性
	var object = document.getElementById("div");
	object.style.border = "1px solid black";		// 设置css属性
	Object.style.border 					// 获取Object的border属性

	//getComputedStyle方法能获得最终css属性值

	pro = window.getComputedStyle(object,null);		// 参数为("元素","伪类")
	console.log(pro.border);
```

**2. JQuery方法：**

```javascript
	$("#div").css("border","1px solid black");	
	$("#div").css("border");				// 获取div的boder属性
```

>设置css属性值原生方法和JQuery都是简单的设置元素的style属性


--------
## Part2 修改文档结构


### 插入和替换元素：

**1. 原生DOM方法：**
	
```javascript
	var object = document.getElementById("div");
	var ins = document.createTextNode("xxxx");
	var ins1 = document.createElement("p");
	object.appendChild(ins);
	ins.appendChild(ins1);
```

**2. JQuery方法：**

```javascript
	$("#div").append("<span>123<span>"); 		// 在#div元素内容末尾追加内容
	$("#div").prepend("123");			// 在#div元素内容起始处添加内容
	$("#div").before("123");			// 在#div元素之前添加内容
	$("#div").after("123");				// 在#div元素之后添加内容
	$("h2").replaceWith("<h3>");			// 将h2元素替换为h3,这里会替换成<h3></h3>，内容会消失

	//另一种方法
	$("<span>123<span>").appendTo("#div")
	$(document.createTextNode("123")).prependTo("#div");
	$("123").insertBefore("#div");
	$("123").insertAfter("#div");
	$("<h3>").replaceAll("#div");

	//复制元素
	$("#div").clone().appendTo("h3");		// 在每个<h3>内容末尾处追加元素#div

	//包装元素
	$("h1").wrap(document.createElement("div"));	// 生成<div><h1>....</h1></div>
	$("h2").wrapInner("<i></i>");			// 生成<h2><i>...</i></h2>
	$("img").wrapAll(document.createElement("div")) // 生成<div><img>...</img></div>

```



