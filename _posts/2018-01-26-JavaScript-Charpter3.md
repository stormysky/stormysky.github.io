---
layout: post
title: 3. javascript对象
description: "简单介绍js对象"
modified: 2018-01-26
tags: [javascript]
comments: false
image:
  feature: 
  credit: 
  creditlink: 
---

## Part1 创建对象

有三种创建对象的方法

Try空对象:

```javascript

	var a = {}			// 对象直接量
	var b = new Object();			  // 创建一个空Object对象
	var c = Object.create(Object.prototype);			//效果和前两种方法一致
	var d = Object.create(null);			// 创建空对象，不继承Object.prototype

```
>a,b,c都继承了Object的prototype，参考[charpter2 instanceof]({{ site.url }}/JavaScript-Charpter2/part2-ininstanceof运算符),

Try非空对象:

```javascript
	
	var a = {x:1,y:2};			// 对象直接量
	var b = new Object(a);			// b => {x:1,y:2}
	var c = Object.create(a);			// {}
	//b,c的功能并不一样

```

>b使用new Object会调用Object的构造函数，将a传入作为初始值，所以得到{x:1,y:2}
>Object.create()创建一个新对象，原型对象为传入的第一个参数(即{x:1,y:2})，生成对象{}的__proto__(原型对象)为{x:1,y:2,__proto__}

Try Object.create:

```javascript

	var a = {x:1,y:30};
	var b = Object.create(a);
	b.x = 5;
	var c = Object.create(b);
	c.x = 10;
	console.log(b.x,b.y);			// 5 30
	console.log(c.x,c.y);			// 10 30
	console.log(c.z);			//undefined

```
>对象的属性值首先会在该对象的属性中寻找，如未找到就在其原型对象中查找，如未找到就在该原型对象的原型对象中查找直到找到为止，未找到返回undefined
> z in c -> z in c._proto__ -> z in c.__proto__.__proto__ -> return undefined

## Part2 对象操作

Try 一些直观的栗子:

```javascript
	
	var a = {name:"deak",sex:"male"};

	a.name; a["name"];			// 读取对象属性

	a.age = 40;			// 添加对象属性

	delete a.age;			// 删除对象属性,无法删除继承属性
	delete a.name.toString;			// false

	"name" in a;				// true,检测对象属性

	a.hasOwnProperty("name");			// true,检测自有属性
	a.hasOwnProperty("toString");			// false
	a.propertIsEnumerable("name");			// true.检测自有属性是否可枚举
	Object.prototype.propropertIsEnumerable("toString");			// false,不可枚举

```

## Part3 setter & getter

由setter和getter定义的属性乘坐存储器属性，不同于数据属性

Try:

```javascript

	var a = {
	    data : 12,
	    set op(x){
	        this.data = this.data + x;
	    },
	    get op(){
	        return this.data;
	    },          //存取器属性定义一个或两个属性同名的函数
	    get ox(){
	        return this.data*12;
	    }
	};
	a.op = 8;
	console.log(a.op);          // 20
	console.log(a.ox);          // 240

```

>要注意关键字set,get之后的函数没有function关键字，op,ox等setter,getter属性跟普通属性一样读写


## Part5 属性特征

获取属性特征：

>Object.getOwnPropertyDescriptor(),Object.getOwnPropertyDescriptors()

设置属性特征：

>Object.defineProperty(),Object.defineProperties()

Try:

```javascript
	
	// Object.definePropery 第一个参数为对象，第二个参数为对象属性，第三个参数为需要设置的对象
	//这里定义一个objectId属性，不可枚举，不可配置，不可写，设置getter属性
	Object.defineProperty(Object.prototype,"objectId",{
	    get: IdGetter,			// getter属性
	    wirtable： false,
	    enumerable: false,
	    configurable: false
	});

	function IdGetter(){
	    if(!(idprop in this)){
	        if(!Object.isExtensible(this)){
	            throw Error("error");
	        }
	        Object.defineProperty(this,idprop,{
	            value: nextid++,
	            writable: false,
	            enumerable: false,
	            configurable: false
	        });
	    }
	    return this[idprop];
	}

```

```javascript

	// Object.defineProperties批量设置属性
	function Range(from , to){
	    // var prop = {
	    //     from:{value: from, enumerable: true, writable:false, configurable:false},
	    //     to:{value: to, enumerable: true, writable:false, configurable:false}
	    // };

	    // if(this instanceof Range)
	    //     Object.defineProperties(this,prop);
	    // else
	    //     return Object.create(Range.prototype,prop);
	    this.from = from;
	    this.to = to;
	    Object.defineProperty(this,"from",{enumerable: true, writable:false, configurable:false});
	    Object.defineProperty(this,"to",{enumerable: true, writable:false, configurable:false});

	}			//一个Range类,注释部分和未注释效果一样

	Object.defineProperties(Range.prototype,{
	    includes:{
	        value:function(x){return this.from <= x &&x <= this.to}
	    },
	    foreach:{
	        value:function(f){
	            for(var x= Math.ceil(this.from);x<=this.to;x++)(fx);
	        }
	    },
	    toString:{
	        value:function(){return this.from + this.to;}
	    }
	});

	var range = new Range(1,50);
	console.log(range.includes(20));

	range.from  = 20;
	console.log(range.from);

	console.log(Object.getOwnPropertyNames(range));
	console.log(Object.getOwnPropertyDescriptors(range));			// 批量获取属性描述符
	console.log(Object.getOwnPropertyDescriptor(range,"from"));			// 获取特定属性描述符

```
