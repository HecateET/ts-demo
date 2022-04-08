// 原始类型
let bool:boolean = true
let num:number|null|undefined = 123
let str:string = 'abc'


//数组
let arr1: number[]=[1,2,3]
let arr2: Array<number|string> = [1,2,3,'4'];//联合类型


// 元组
let tuple:[number,string] = [0,'1']
tuple.push(2) //TS中允许往元组中插入元素，实际开发不建议如此写
console.log(tuple)
// tuple[2] // 但是不能越界访问

// 函数
// let add = (x,y)=>x+y; //加上参数类型即可
let add = (x:number,y:number) => x+y // 返回值可以不定义类型，这边用到了TS的类型推断
let compute:(x:number,y:number) => number // 函数类型，没有具体的实现
compute = (a,b)=> a+b 

// 对象
// let obj:object = {x:1,y:2}
// obj.x = 3; // TS中这样写是不允许，没有具体的定义他饱含了哪些属性

let obj:{x:number,y:number} = {x:1,y:2}
obj.x = 3;

// symbol 具有唯一的值
let s1: symbol = Symbol()
let s2 = Symbol()
// 上面两个变量是不相等等的
console.log(s1===s2) //false

// undefinded,null,可以被赋值为它本身
let un:undefined = undefined
let nu:null = null

// 
// 报错：Type 'null' is not assignable to type 'number'.不将undefined和null赋值给number类型 。
// TS官方文档中定义：undefinded和null是任何类型的子类。说明它可以被赋值为其他类型。
// 需要单独做设置,在tsconfig.json中设置："strictNullChecks": false,   
num = undefined
num = null

/**
 * 如果 "strictNullChecks": true的时候，就要定义num为联合类型
 * 例如：let num:number|null|undefined = 123
 */

/**
 * void,操作符,让任何表达式返回undefined。
 * 为何有这种设置：
 * 因为undefined在js中它不是一个保留字，我们甚至可以自定义变量去替换全局的undefined
 * TS中，没有任何返回值的函数，就是void类型
 */
let noReution=()=>{}

// any,和js一样
let x
x=1;
x=[];
x =()=>{

}

// never ,一个函数抛出异常就永远都不会有返回值
let error = ()=>{
    throw new Error('error')
}

// 一个函数为死循环的时候，它的类型就是never类型
let endless = () => {
    while(true){

    }
}

