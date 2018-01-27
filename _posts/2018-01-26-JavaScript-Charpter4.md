---
layout: post
title: 4. javascript数组
description: "简单介绍js数组"
modified: 2018-01-27
tags: [javascript]
comments: false
image:
  feature: 
  credit: 
  creditlink: 
---

>数组也是对象的特殊形式

## Part1 数组基本操作

Try 创建数组:

```javascript

	var a = [];				//	空数组
	var b = [{1,2},{3,4},"123",123];	// 不同类型元素的数组
	var c = [,,];				// 两个uundefined元素

	var d = new Array();			// 空数组
	var e = new Array(10);			// 一个长度为10的数组
	var f = new Array(10,10,11,11);		// 当参数大于1，传入参数初始化为数组元素[10,10,11,11]

	// 二维数组
	var g = new Array(5);
	for(var i = 0; i < g.length; i++){
		g[i] = new Array(10);
	}
	//init
	for(var i = 0; i < g.length; i++){
		for(var j = 0; j < g[i].length; j++){
			g[i][j] = i*j;
		}
	}

```

Try 数组读写和遍历:

```javascript
	
	var a = [1,2,3,4,5];
	for( var x in a ){
		console.log(a[x]);				// 遍历读取数组
	}

	for( var i = 0; i < a.length; i++ ){
		a[i] += 5;					// 遍历写数组，为每个数组+5
	}

```

Try 数组添加删除:

```javascript

	var a = [1,2];
	a[2] = 3;						// 添加元素

	a.push(4);						// 末尾追加元素，长度+1
	a.pop();						// 删除最后一个元素，长度-1

	a.shift();						// 删除第一个元素，长度-1
	a.unshift(5);						// 头部增加元素

	delete a[0];						// 删除第一个元素，长度不变，索引处不再有元素empty

	var b = [1,2,3,4,5,6,7];
	b.splice(5);						// 返回删除数组[6,7],b为[1,2,3,4,5]
	b.splice(2,2);						// 返回[3,4],b为[1,2,5]
	b.splice(1,1,10);					// 返回[2],b为[1,10,5]
	b.splice(1,0,20);					// 返回[],b为[1,20,10,5]

```
>权威指南第六版，p154，splice中最后栗子有误，var a=[1,2,3,4,5];a.splice(2,2,[1,2],3); a应该为[1,2,[1,2],3,5]


## Part2 数组方法(部分)

Try:

```javascript
	
	//join将数组转换为字符串,是String.split逆向操作
	var a = [1,2,3,["a","b"]];
	a.join("");						// 返回"123a,b"
	a.join();						// 返回"1,2,3,a,b"
	a.join(" ");						// 返回"1 2 3 a,b"

	//reverse()将数组元素颠倒
	var a = [1,2,3];
	a.reverse();						// a是[3,2,1]

	//sort,按照字母表顺序排序，返回排序好的数组
	var a = ["b","c","a"];
	a.sort();						// 返回["a","b","c"]
	var a= [2,1,3];
	a.sort(function(a,b){return a-b;})			// 返回[1,2,3]


	//concat链接数组元素
	var a = [1,2,3];
	a.concat(4,5);						// 返回[1,2,3,4,5]
	a.concat([4,5]);					// 返回[1,2,3,4,5]
	a.concat([4,[5,6]]);					// 返回[1,2,3,4,[5,6]]

	//slice返回子数组
	var a = [1,2,3,4,5];
	a.slice(0,2);						// 返回[1,2]
	a.slice(3);						// 返回[4,5]
	a.slice(1,-1);						// 返回[2,3,4]

	//forEach遍历数组为每个元素调用函数
	var a = [1,2,3,4,5];
	a.forEach(function(v,i,a){ a[i] = v+1; }) 		//a是[2,3,4,5,6]

	...等等方法

```

>参考文献:《javascript参考指南》第7章，[MDN](https://developer.mozilla.org/zh-CN/)


