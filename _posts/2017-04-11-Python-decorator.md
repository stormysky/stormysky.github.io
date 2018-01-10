---
layout: post
title: Python装饰器
description: "Python装饰器用法"
modified: 2017-04-11
tags: [Python]
comments: false
image:
  feature: python-logo.png
  credit: 
  creditlink: 
---

# 装饰器 #
----------

装饰器是为函数和类指定管理代码的一种方式.

- **函数装饰器**在函数定义的时候进行名称重绑定，提供一个逻辑层来管理函数和方法
或随后对它们的调用。
- **类装饰器**在类定义的时候进行名称重绑定，提供一个逻辑层来管理类，或管理随后
调用它们所创建的示例。

- **函数装饰器**安装包装器对象，以在需要的时候拦截随后的函数调用并处理它们。

- **类装饰器**安装包装器对象，以在需要的时候拦截随后的实例创建调用并处理它们。

- **总之就是提供一个逻辑层来控制类或者函数，拦截原函数和原实例对他们进行再加工，可以在不修改原函数和原类的基础上再加工函数和类的方法**


#### 装饰器优点：

- 装饰器有一种非常明确的语法，这使得它们比那些可能任意地远离主体函数或类的
辅助函数调用更容易为人们发现。

- 当主体函数或类定义的时候，装饰器应用一次；在对类或函数的每次调用的时候，
不必添加额外的代码。

- 由于前面两点，装饰器使得一个API的用户不太可能忘记根据API需求扩展一个函
数或类。

- **简单的来说就是减少冗余**


#### 调用方式：

```python
def decorator:
    ....

class decorator:
    ....
```


## 函数装饰器：
----------

```python
@decorator # Decorate function
def F(arg):
    ...
F(99) # Call function

# equal to

def F():
    ...

F = decorator(F)
```

此处调用F的结果就是调用 decorator(F)(...)  (decorator(F)此处为一个函数),

更为详细的调用:

```python
def decorator(F): # On @ decoration
    def wrapper(*args): # On wrapped function call
        # Use F and args
        # F(*args) calls original function
    return wrapper

@decorator # func = decorator(func)
def func(x, y): # func is passed to decorator's F
    ...

func(6, 7) # 6, 7 are passed to wrapper's *args
```

在类成员函数中使用：

```python
class decorator:
def __init__(self, func): # On @ decoration
    self.func = func

def __call__(self, *args): # On wrapped function call
    self.func(*args)
    print(*args)

@decorator
def func(x, y): # func = decorator(func)
    print("func")

func(6, 7) # 6, 7 are passed to __call__'s *args

##result:
func
6 7
```


此时调用func(6,7)实际是调用decorator.__call__(func,(6,7))
稍作修改：

```python
	class decorator:
	    def __init__(self, func): # func is method without instance
	        print("init",func)
	        self.func = func
	    
	    def __call__(self, *args): # self is decorator instance
	        print("call",*args)
	        self.func(*args)

	class C:
	    @decorator
	    def method(self, x, y): # method = decorator(method)
	        print("method",x,y)# Rebound to decorator instance

	x =C()
	x.method(C,1,2)

	##reusult:

    init <function C.method at 0x0000000000A612F0>
	call <class '__main__.C'> 1 2
	method 1 2
```

仍然遵循F = decorator(F)，即decorator(method)(C,1,2) => __call__(method,(C,1,2)) => C.method(C,1,2)
但是这里有个问题，当调用x.method(1,2)时,最终调用的是C.method(1,2),此时会少一个参数C类的"self"参数,所以还要传一次"C"进去

```python
	def decorator(F): 
	    def wrapper(*args):
	        return F(*args)
	    return wrapper

	@decorator
	def func(x, y): # func = decorator(func)
	    print(x,y)

	func(6, 7)

	class C:
	    @decorator
	    def method(self, x, y):
	        print("method",x,y)

	X = C()
	X.method(6, 7)

	#result
	6 7
	method 6 7
```

这里使用嵌套函数装饰器显然比刚才的例子要好，这也是装饰器比较普遍使用的方法。


## 类装饰器 ##
----------

```python
	@decorator # Decorate class
	class C:
	    ...

	x = C(99) # Make an instance

	#equal to

	class C:
	    ...

	C = decorator(C) # Rebind class name to decorator result
	x = C(99) # Essentially calls decorator(C)(99)
```

和函数装饰器基本一致，只不过是换成的类而已。例子：

```python
	def decorator(cls): # On @ decoration
	    class Wrapper:
	        def __init__(self, *args): # On instance creation
	            print(*args)
	            self.wrapped = cls(*args)

	        def __getattr__(self, name): # On attribute fetch
	            return getattr(self.wrapped, name)
	    return Wrapper

	@decorator
	class C: # C = decorator(C)
	    def __init__(self, x, y): # Run by Wrapper.__init__
	        self.attr = 'spam'

	x = C(6, 7) # Really calls Wrapper(6, 7)
	print(x.attr) # Runs Wrapper.__getattr__, prints "spam"

	##result:

	6 7
	spam
```

此处装饰器 C = decorator(C), decorator返回Wrapper,所以调用C其实是调用Wrapper
再看下面的例子：

```python
	class Decorator:
	    def __init__(self, C): # On @ decoration
	        self.C = C
	    def __call__(self, *args): # On instance creation
	        print("call")
	        self.wrapped = self.C(*args)
	        return self
	    def __getattr__(self, attrname): # On atrribute fetch
	        return getattr(self.wrapped, attrname)

	@Decorator
	class C:
	    def __init__(self,*args):
	        self.happy= args

	x = C(12)  # x = Decorator(C)(12)
	print(x.__getattr__("happy"),x)
	y = C(436) # Overwrites x!
	print(x.__getattr__("happy"),y.__getattr__("happy"),y)

	##result
	call
	(12,) <__main__.Decorator object at 0x00000000008145C0>
	call
	(436,) (436,) <__main__.Decorator object at 0x00000000008145C0>
```

实例x,y指向的地址其实是一样的，所以第二次初始化y的时候会重写x


## 装饰器嵌套 ##
----------

有的时候，一个装饰器不够。为了支持多步骤的扩展，装饰器语法允许我们向一个装饰的函数或方法添加包装器逻辑的多个层。当使用这一功能的时候，每个装饰器必须出现在自己的一行中。这种形式的装饰器语法：

```python
	@DecoratorA
	@DecoratorB
	@DecoratorC
	def C():
	    pass


	#equal to

	C = DecoratorA(DecoratorB(DecoratorC(C)))
```

## 装饰器参数 ##
----------

```python
	@Decorator(A, B)
	def F(arg):
	...
	F(99)

	#equal to

	F = Decorator(A,B)(F)

	F(99) # Decorator(A,B)(F)(99)
```

例如：

```python
	def Decorator(x,y):
	    print(x,y)
	    def Myfuc(func):
	        return func
	    return Myfuc


	@Decorator(1, 2)
	def F(arg):
	    print(arg)

	F(99) # equal to Decorator(1,2)(F)(99) => Myfunc(F)(99) => func(99)

	##result
	1 2
	99
```