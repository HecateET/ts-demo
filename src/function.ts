// 函数定义

function addA(x:number,y:number){
    return x+y;
}

let addB:(x:number,y:number) => number

type addC = (x:number,y:number) => number

interface addD{
    (x:number,y:number):number
}

// addA(1,2,3)

//可选参数,可选参数需要放在固定参数的后面
function addE(x:number,y?:number){
    return y? x+y:x;
}
addE(1)


function addF(x:number,y=0,z:number,q=1){
    return x+y+z+q;
}

//在必选参数前默认参数是不可省略的， 必须要传入undefined代表默认值,在必选参数之后的默认参数可不传递
console.log(addF(1,undefined,3))


function addG(x:number,...rest:number[]){
    return x+ rest.reduce((pre,cur)=> pre+cur)
}

console.log(addG(1,2,3,4,5))

// 函数重载,不需要用相似功能的重新定义
/**
 * 函数支持多个参数， 参数都是数字则返回数字之和。 如果参数都是字符串， 则返回字符串的拼接
 * TS的重载要求：我们先定义一切名称相同的函数声明,在类型最宽泛的函数中实现重载
 * 要把最容易匹配的函数定义写在最前面
 */

function addH(...rest: number[]): number; //函数实现缺失或未立即出现在声明之后。ts(2391)
function addH(...rest: string[]): string; //函数实现缺失或未立即出现在声明之后。ts(2391)
function addH(...rest: any[]):any{
    let first = rest[0];
    if(typeof first ==='string'){
        return rest.join('')
    }
    if(typeof first ==='number'){
        return rest.reduce((pre,cur)=> pre+cur)
    }
}

console.log(addH(1,5))

console.log(addH('a','b','c'));

