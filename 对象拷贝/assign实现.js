function assign(target,...source){
    if(typeof target !== 'object'){
        throw new Error('目标对象必须是object类型!')
    }

    if(target === null){
        throw new Error('目标对象不能为null!')
    }

    for(let obj of source){
        if(typeof obj === 'object'){
            /** 只有object类型才执行拷贝 */
            for(const key in obj){
                /** for...in... 决定了只copy可枚举的 */
                /** 使用hasOwnProperty限制只拷贝自有键 */
                if(obj.hasOwnProperty(key)){
                    target[key] = obj[key]
                }
            }
        }
    }

    return target
}

const obj1 = {
    a:100,
    b:200,
    c: 300,
}

const obj2 = assign(obj1,{b:'hello'},{c:'world'},{d:'test assign'})

console.log(obj1,obj2,obj1 === obj2)