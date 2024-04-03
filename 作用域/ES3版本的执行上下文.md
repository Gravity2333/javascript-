# ECMAScript 3 版本中的执行上下文

我们经常看到的 VO AO GO 的概念就来源于ES3中的标准

在此标准中，执行上下文EC包含以下几个部分

1. 变量对象VO (Variable Object) 在全局执行上下文中的变量对象为GO（Global Object全局对象），在函数执行上下文中的变量对象称为AO（Activate Object 活动对象），其中GO我们可以理解为 window （浏览器环境） 而AO我们无法通过JS访问!

2. 作用域链 scoped chain 是一个列表，其中记录了当前上下文的VO和所有parent上下文的VO

3. this 绑定 - this binding 决定了this的指向

其中，所有的变量 var function 等等，都会被放到GO中，所以我们通过window.xxx 即可访问到

需要注意，var和function都存在提升的现象，区别在于

- var只提升变量声明，并且会尝试赋值undefiend 
- function会在赋初值时创建函数对象

由于先赋var 后赋 function，所以同名的函数会覆盖掉同名的var变量，也就是我们说的 <span style="background: yellow;color:red">函数优先!<span>

> 函数对象包含什么？
> 
> name: 函数名称
>
> length: 形参个数
>
> arguments 形式参数伪数组
>
> prototype 原型对象
>
> [[scope]]: 指向当前的ECS顶部的上下文

## scope chain 作用域链

作用域链scope chain 也是一个无法直接访问的C++对象，可以理解为是一个对象列表，用于查找变量的值，可以理解为其包含了当前VO和其所有parent的Vo的列表

当函数对象创建时，其[[scope]]属性会指向当前ECS顶部上下文的作用域链，其包含当前执行上下午及其所有的parent上下文

当函数执行时，新生成的函数执行上下文会将其scope chain赋成:

    当前变量对象 + [[scope]]


用伪代码来表述一下ES3版本的执行上下文：
```javascript

<script>
	// 执行上下文
	ExecutionContext: {
		// 变量对象  |  活动对象
		[variable object | activation object]: {
			arguments: [...],// 在全局执行上下文中没有arguments
			variable: [...],
			function: [...]
		},
		
		// 作用域链
		scopeChain: variable object + all parents scopes,
 
		// this 指向
		thisValue: context object
	}
```
