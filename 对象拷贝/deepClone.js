/**
 * NOTE:
 * 深拷贝需要注意几个事情
 * 1. 需要特殊处理时间Date对象，如果判断类型为Date需要new一个新的Date对象
 * 2. 需要特殊处理RegExp对象，如果判断为RegExp需要new一个新的正则对象
 * （为什么要单独处理？ 因为这些对象中有一些对象是无法通过拷贝的方式赋值的，可能是计算属性，writable=false，或者内置属性
 * 只有通过new新对象的方式才能处理，如RegExp中的source和flag属性 无法直接regExp.source = xxx 来改变source，想改变必须new一个新的对象)
 * 3. 数组需要单独处理，因为数组中的每一项都需要递归处理
 * 4. 函数一般情况下不拷贝 因为其不可变
 * 5. Map和Set需要单独处理，可以使用forEach
 * 6. 原型链需要处理，使用Object.create(Object.getPrototypeOf(obj))
 * 7. 循环引用可以用WEAKMAP解决
 * 8. 不可枚举的属性可以用 Object.getOwnPropertyNames(obj)解决
 * 9. 处理属性为Symbol的情况，用Object.getOwnPropertySymbols()解决
 */
function deepClone(target, cache = new WeakMap()) {
  /**
   * 基本类型，函数类型，null类型 直接返回
   */
  if (typeof target !== "object" || typeof target === null) {
    return target;
  }

  /** 处理日期类型 */
  if (target instanceof Date) {
    return new Date(target);
  }

  /** 处理正则表达式 */
  if (target instanceof RegExp) {
    return new RegExp(target);
  }

  /** 处理环，因为Date和RegExp不存在环的问题，所以在下面处理 */
  if (cache.has(target)) {
    return cache.get(target);
  }

  /** 处理Map Set */
  if (target instanceof Map) {
    const clone = new Map();
    cache.set(target, clone);
    target.forEach((key, value) => {
      clone.set(key, value);
    });
    return clone;
  }

  if (target instanceof Set) {
    const clone = new Set();
    cache.set(target, clone);
    target.forEach((value) => {
      clone.add(value);
    });
    return clone;
  }

  /** 处理数组，每1项都需要递归处理 */
  if (Array.isArray(target)) {
    const clone = [];
    cache.set(target, clone);
    for (let i = 0; i < target.length; i++) {
      cache[i] = deepClone(target[i], cache);
    }
    return clone;
  }

  /** 一般类型，先获取key值 （可枚举和不可枚举） */
  const keys = Object.getOwnPropertyNames(target);
  /** symbol keys */
  const symbolKeys = Object.getOwnPropertySymbols(target)

  const clone = Object.create(Object.getPrototypeOf(target));
  cache.set(target, clone);
  /** 处理描述符 */
  Object.defineProperties(clone, Object.getOwnPropertyDescriptors(target));
  [...keys,...symbolKeys].forEach((key) => {
    clone[key] = deepClone(clone[key], cache);
  });
  return clone;
}


function add(x,y){
    return x+y
}

const reg = /^haha$/g
const now = new Date()

const map = new Map()
map.set('test',reg)
const set = new Set()
set.add('set value')

const obj = {
    [Symbol('a')]: 'symbol_infos',
    add,
    reg,
    date: now,
    list: [now,add,reg,100,{
        a: 100,
    }],
    map,
    set,
}

Object.defineProperty(obj,'unenumerable',{
    enumerable: false,
    configurable: false,
    writable: false,
    value: 'unenumerable value'
})

// 循环
obj.parent = obj

console.log(obj,deepClone(obj))

