Class
=============
#创建自定义类型#

***
	+使用动态原型，没有创建实例，类不会持有原型，减少开销。
	+使用方便，内部有容错机制


### 定义一个新类型
```
javascript:

function A(){

}
A.prototype.a = function(){}
A.prototype.b = function(){}

```

### 用Class辅助方法定义一个新类型
```
javascript:

var A = Class(
  function(){

  },
  {
     a : function(){},
     b : function(){}
  }
)

```

### 创建Class定义的类型的新实例
#### 内部有机制可以自动使用new关键字

***
	1. new A();
	2. A();

### License
MIT

