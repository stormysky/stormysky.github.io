---
layout: post
title: 5. javascript函数
description: "js函数"
modified: 2018-02-05
tags: [javascript]
comments: false
image:
  feature: 
  credit: 
  creditlink: 
---

## Part1. 函数参数

js中函数实参是可以可变的，可以通过**标识符arguments**来得到，arguments是指向实参对象的列表

**Try** 下面是一个求和的函数的例子：

```javascript

	function tryFunc(){
		var sum;
		for(var i = 0,sum=0; i<arguments.length; i++){
			sum += arguments[i];
		}
		return sum;
	}

	console.log(tryFunc(1,2,3,4,5));		// 15

```

>js实参对类型没有检查，所以在写函数的时候可以通过注释来对参数进行说明，或者在函数中加入判断即可

## Part2. 函数属性

函数作为特殊的对象，也具有对象的特点。来看一个栗子

**Try:**

```javascript

	function pro(a,b){
		return a+b+pro.x;
	}
	pro.x = 1;
	console.log(1,2);			// 4

```
>这里调用了pro的自有属性x作为值参与运算，得出结果为4.接下来再看一个栗子

**Try：**

```javascript
	
	function factorial(n){
		if(isFinite(n) && n>0 && n == Math.round(n)){
			if(!(n in Factorial)){
				factorial[n] = n * factorial(n-1);
			}
			return factorial[n];
		}
		else return NaN;
	}
	factorial[1] = 1;

```
>这个例子通过自身属性存储n阶乘的值，之后通过访问factorial[n]就能快速得出结果


## Part3. 闭包

定义：函数对象可以通过作用域链相互关联起来，函数体内的变量都可以保存在函数作用域内，这种特性称为“闭包”。js中函数都是闭包

**Try**看下js函数重载的栗子：

```javascript

	var text = "global";
	function test(){
		var text = "local";
		function f(){console.log(text);}
		return f();
	}
	test();				// local

	funtion test1(){
		var text = "local";
		function f(){console.log(text);}
		return f;
	}
	test1()();			// local

```

>可以看到test函数返回了f函数的执行结果，f函数打印了函数作用域中的text的值
>test1函数中返回了函数f，执行f函数后，发现返回的仍然是local。这是因为嵌套的函数f在test1作用域中，所以text（local）会绑定到f中，不论何时何处都会是local

**Try**利用闭包实现js函数重载:

```javascript

//addMethod
function addMethod(object, name, fn) {
	var old = object[name];
	object[name] = function() {
		if(fn.length === arguments.length) {
			return fn.apply(this, arguments);
	} else if(typeof old === "function") {
			return old.apply(this, arguments);
		}
	}
}
	 
	 
	var people = {
		values: ["Dean Edwards", "Alex Russell", "Dean Tom"]
	};
	 
	/* 下面开始通过addMethod来实现对people.find方法的重载 */
	 
	// 不传参数时，返回peopld.values里面的所有元素
	addMethod(people, "find", function() {
		return this.values;
	});

	console.log(people);
	 
	// 传一个参数时，按first-name的匹配进行返回
	addMethod(people, "find", function(firstName) {
		var ret = [];
		for(var i = 0; i < this.values.length; i++) {
			if(this.values[i].indexOf(firstName) === 0) {
				ret.push(this.values[i]);
			}
		}
		return ret;
	});

	console.log(people);
	 
	// 传两个参数时，返回first-name和last-name都匹配的元素
	addMethod(people, "find", function(firstName, lastName) {
		var ret = [];
		for(var i = 0; i < this.values.length; i++) {
			if(this.values[i] === (firstName + " " + lastName)) {
				ret.push(this.values[i]);
			}
		}
		return ret;
	});

	console.log(people);
	 
	// 测试：
	console.log(people.find()); //["Dean Edwards", "Alex Russell", "Dean Tom"]
	console.log(people.find("Dean")); //["Dean Edwards", "Dean Tom"]
	console.log(people.find("Dean Edwards")); //["Dean Edwards"]

```

## Part4. 函数call,apply,bind方法

我们经常能看到call和apply，他们可以间接的调用函数.功能一样，但是参数不同

**Try:**

```javascript

	var a = 20;
	var o = {a:15};
	function f(b,c){
	    console.log(this.a+b+c);
	}
	f.call(this,1,2);			// 23
	f.apply(o,[1,2]);			// 18
	
	//or
	Array.prototype.slice.call(a, n||0);

```
>[slice用法]({{ site.url }}/)

**Try** bind方法:

```javascript

	var o = {o:1};
	function f(){
		//"use strict";
		console.log(arguments);		// [1,2,3,4,5]
		return this;
	}
	f();					// 非严格模式：window，严格模式: undefined
	f.bind(o,1,2,3,4,5)();			// 返回对象o


```
>call和bind的参数都一样，但是call调用之后直接调用函数，bind只是返回了一个函数，需要再调用，apply和bind、call参数不同。

