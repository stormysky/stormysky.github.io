---
layout: post
title: 2. javascript表达式和运算符
description: "js表达式和运算符"
modified: 2018-01-24
tags: [javascript]
comments: false
image:
  feature: 
  credit: 
  creditlink: 
---

## Part1 等号、不等运算符

- "=="和"===" 都可以用来判断相等，其中"==="用来检测严格相等，"=="判断相等可以进行类型转换
- "!="和"!=="为不等，同上

Try：

```javascript

	"1" == 1				// true
	"1" === 1				// false,类型不等
	{} == {}				// 任何对象都不相等
	NaN !== NaN				// true
	0 === -0 				// true
	null == undefined			// true, (上一节Part3)
	null === undefined			// false
```
[**关于null和undefined**]({{ site.url }}/JavaScript-Charpter1#part3--null和undefined)

* "==="运算符 --- 
	1. 首先判断类型，类型不相等返回false
	2. 其次判断值

* "==" 运算符 
	1. 如果严格相等则必然相等
	2. 如果一个值是数字一个是字符串，将字符串转换为数字后比较
	3. 如果是布尔值，先转换为数字后比较
	4. 如果一个值是对象，先将[**对象转换为原始值**]({{ site.url }}/JavaScript-Charpter1#part4--类型转换)

## Part2 in，instanceof运算符

直接上栗子

Try:

```javascript

	var person = {name:"jack",sex:"male"};

	"name" in person 		// true
	"age"  in person		// false
	"toString" in person	// true

	var data = [1,2,3];
	"0" in data 			// true
	3   in data 			// false

	var a = function(){};
	var cas = new a();
	cas instanceof a		// true
	cas instanceof Array	// false

	/*判断a.prototype是否在cas的原型链上，a.prototype == cas.__proto__*/

```

* in 左操作符为字符串或可转为字符串的值，有操作符为一个对象
* instanceof 左操作符为一个对象，右操作符为一个类
	eg.  表达式o instanceof f ,首先计算f.prototype，然后在o的原型链中查找o，
	如若找到则返回true，反之返回false。(此处权威指南p78，“在原型链中查找o不太准确”)


* 原型链，var cas = new a();  =>  
	1. var cas={}; cas.\__proto__ = a.prototype; a.call(cas);
	2. a.\__proto = Function.prototype
	3. Function.\__proto__ = Object.prototype
后面的章节详细介绍

## Part3  eval

**eg**. eval("3+2") 	// 5
eval()，只有一个参数，参数为字符串时进行编译，不是字符串直接返回这个参数

Try:
```javascript
	
	var geval = eval;
	var x="global",y="global";
	function f(){
	    var x = "local";
	    eval("x += 'changed'");
	    return x;
	}

	function g(){
	    var y = "local";
	    geval("y += 'changed'");
	    return y;
	}
	console.log(f(),x);		//localchanged global
	console.log(g(),y);		//local globalchanged

```

当通过别名调用，eval会将字符串当成顶层全局代码执行(ES5), 直接调用和普通函数一样


## Part4  void运算符 

* 返回undefined，eg. void(5)  // undefined
* 还可以这样使用

	void function(){}();  =>  效果等同于 (function(){}()); 
	可以将void 替换成其他运算符

* 在Html标签a中使用 javascript:void