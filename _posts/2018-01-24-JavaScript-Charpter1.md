---
layout: post
title: 1. javascript类型、值和变量
description: ""
modified: 2018-01-24
tags: [javascript]
comments: false
image:
  feature: 
  credit: 
  creditlink: 
---


## Part1 JS特殊值

*javascript*中特殊的值：NaN(非数字值), Infinity(上溢出), -Infinity(下溢出)

Try:

```javascript
	0/0  ===   NaN		// false
	isNaN(0/0)			// true
	1/0  ===  Infinity  // true
	-1/0 === -Infinity  // true
	isFinity(1/0) 		// true
	1/0 === -1/0		// false
```

## Part2 浮点数误差

*javascript*采用[IEEE-754](https://ieeexplore.ieee.org/document/4610935/),是一种二进制表示法
，所以表示十进制的时候会有误差...

Try:

```javascript
	137.3 - 40 === 97.3 	// false
	137.3 - 40 				// 97.30000000000001
	0.3 - 0.2 === 0.2 -0.1 	// false
```
解决方法，四舍五入

```javascript
	var precise = 13;
	return Math.round(num*Math.pow(10,precise))/Math.pow(10,precise);
```

当precise>14又会发生误差，所以只要*将浮点数转换至整数后再做运算就不会出现误差*

Try:

```javascript

	(137.3*10 - 40*10)/10 === 97.3 		// true

	function sub(a,b){
		var c = a.toString(), d = b.toString();
		var alength,blength;
		if(c.indexOf(".") > -1)
			alength = c.length - c.indexOf(".") - 1;
		else
			alength = 0;

		if(d.indexOf(".") > -1)
			blength = d.length - d.indexOf(".") - 1;
		else
			blength = 0;

		var precise = Math.pow(10,Math.max(alength,blength));
		return (a*precise - b*precise)/precise;
	}
	sub(137.3,40) //97.3

	... same way to implement add ..
```

## part3  null和undefined

*null*是一个特殊值，描述“空值”, typeof(null) => "object"，null是一个特殊的对象
*undefined*也用来表示“空值”，当变量未初始化、函数无返回的时候都会得到一个undefined值

```javascript

	null == undefined 	// true
	nul === undefined 	// false

```

## part4  类型转换

参考《javascript权威指南》p49 表3-2.
undefined, null, 0, -0, NaN, "0"转换为Boolean是都为false ，
其他值都为true(包括±Infinity)

*特别注意:*

```javascript

	Number(undefined) 			// NaN
	Number(null) 				// 0
	Number([8]) 				// 8
	Number(["a"]) 				// NaN
	Number("h")					// NaN
	String([8]) 				// "8"
	String([2,3]) 				// "2,3"
	Object(undefined) 			// throws TypeError
	Object(null) 	 			// throws TypeError


```

*对象转换:*

```javascript

	//调用toString()方法，在原型链上查找到Object.toString()方法
	String({}}) 			// [object Object]

	//调用valueOf(),没有该方法，调用toString再字符串其转换为数字
	Number({}) 			// NaN

	//数组转换为数字
	Number([2,3]) -> valueOf in [2,3] // false 
	-> [2,3].toString() // "2,3" 
	-> Number("2,3")	//NaN

```
1. "+"操作当有一个操作符为对象会执行上述操作
2. "="，"+"操作，除Date类型外的对象会进行对象到数字的转换，Date类型转换为String

## part5 变量作用域

c++中变量作用域为“块级作用域”，{}中每一段代码有各自的作用域
JS中的作用域为“函数作用域”，函数内声明的所有变量在函数体内始终可见


```javascript

	var now = new Date();
	(function scope(){
	    console.log(now);	// undefined
	    var now = 11;
	    console.log(now);	// 11
	}());					

```
1. 第一个console.log打印now的值，此时now虽然声明但还未赋值为undefined
2. 第二个赋值为11，打印11

