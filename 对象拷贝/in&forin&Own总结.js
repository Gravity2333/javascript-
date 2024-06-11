/**
 * in 和 ownProperty区别在于找不找原型链
 */
const obj1 = {
  inner: "inner",
};

obj1.__proto__.outer = "outer in prototype";

console.log("inner" in obj1); // true
console.log(obj1.hasOwnProperty("inner")); //true

console.log("outer" in obj1); // true
console.log(obj1.hasOwnProperty("outer")); // false

delete obj1.__proto__.outer
/**
 * for in 和 in类似，会遍历自有+原型，但是区别在于，for in 找可枚举
 *  log输出的时候，找的也是可枚举
 */

const obj3 = {
  a: 100,
  b: 200,
  c: 300,
};

obj3.__proto__.d = 400
obj3.__proto__.e = 500

Object.defineProperties(obj3, {
  a: {
    writable: true,
    configurable: true,
    enumerable: false,
  },
});

Object.defineProperties(obj3.__proto__,{
    e: {
        enumerable: false
    }
})

console.log(obj3, 'a' in obj3);

for(let i in obj3){
    console.log(i) //b c d
}

