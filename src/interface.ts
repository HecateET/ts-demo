// 用接口定义个对象
interface List{
    readonly id:number; //只读属性
    name: string;
    // [x:string]:any; //字符串索引签名，含义：用任意的字符串去索引list，这样list久可以支持多个属性
    age?:number
}

interface Result{
    data:List[]
}

function render(result:Result){
    result.data.forEach((value)=>{
        console.log(value.id,value.name)
        if(value.age){ //       Property 'age' is missing in type '{ id: number; name: string; sex: string; }' but required in type 'List'.
            console.log(value.age)
        }
        // value.id++//只读属性不允许修改。
    })
}

let result = {
    data:[
        {id:1,name:'A',sex:'male'}, // 传入的对象满足接口的必要条件， 及时多余的字段也是被允许的
        {id:2,name:'B',age:10},
    ]
}

render(result)

// render(result = {
//     data:[
//         {id:1,name:'A',sex:'male'}, // 使用类型断言
//         {id:2,name:'B'},
//     ]
// } as Result) // 会绕过TS的类型检查

//用数字索引的接口
interface StringArray{
    [index:number]:string, //用任意的数字去索引StringArray都会得到一个字符串
}

let chars: StringArray = ['A','B'];

interface Names{
    [x:string]:string //用任意的字符串去索引Names都会得到一个字符串，
    // y:number //此时就不能在声明一个number类型的成员了。 
    [z:number]:string //javascript会进行类型转换， 将number转化为string
}

// 用接口定一个函数

//普通函数声明
let add1: (x:number,y:number) => number;


//接口定义函数声明， 和上面是等价的
interface Add{
    (x:number,y:number):number
}

// 类型别名， 为这个函数取一个名字
type Add2 = (x:number,y:number) => number

let add2 : Add = (a,b) => a+b


//混合类型的接口
interface Lib{
    ():void;
    version:string;
    doSomething():void;
}

//实现这个接口
// let lib:Lib =(()=> {}) as Lib;//此时会提示lib中缺少属性,需要用类型断言
// lib.version = '1.0'
// lib.doSomething = ()=>{}

function getLib(){
    let lib:Lib =(()=> {}) as Lib;//此时会提示lib中缺少属性,需要用类型断言
    lib.version = '1.0'
    lib.doSomething = ()=>{}
    return lib;
}

let lib1 = getLib();
lib1();
lib1.doSomething();
let lib2 = getLib();

/**
 * 小结：
 * 用接口定义了对象和函数。 
 */

