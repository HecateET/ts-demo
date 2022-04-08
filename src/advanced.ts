/**
 * 类型推断
 */
let a=1//赋值为1，则被推断为number类型的变量
// let b=[] //此时被推断为any类型的数组
let b=[1,null] //此时b会被推断为number｜null的联合类型的数组
let c = [1] // 此时被推断为number类型的数组

/**
 * 类型推断的另一个场景是：发生在设置函数默认参数的时候
 * 在确定函数返回值的时候，也会发生类型推断
 * 当需要从多个类型中推断出一个类型的时候， TS会尽可能推断出一个尽可能兼容当前的所有类型的元素
 */
let functionC = (x=1)=> x+1

//以上都是[从右到左]的类型推断， 根据表达式右边的值类来推断出表达式左边的类型

/**
 * 还有一种类型推断是[从左到右]的,上下文类型推断。
 * 通常发生在一个事件处理中,TS会根据左侧的事件绑定，来推测出右侧的事件的类型
 */
window.onkeydown = (event) =>{
    // console.log(event.button) //类型“KeyboardEvent”上不存在属性“button”。ts(2
    console.log(event.key)
}

/**
 * 类型断言
 * 使用类型断言可以增加代码的灵活性，在改造一些旧代码的时候会非常有效
 * 
 * 类型断言避免滥用，要对上下文环境要有充分的预判，没有任何根据的类型断言会给你的代码带来安全隐患。
 */
interface Foo{
    bar:number
}

// let foo = {} as Foo
// foo.bar = 1

/**
 * 建议直接把对象在什么的时候就完善接口的基本类型。
 */
let foo:Foo = {
    bar:1
}

/**
 * 类型检查机制2:
 * X兼容Y: X(目标类型) = Y(源类型)
 */
let s:string = 'a'
s = null //不能将类型“null”分配给类型“string”。
// 需要在tsconfig.json中配置 "strictNullChecks": false,    关闭这个null严格校验
/**
 * 之所以要讨论类型兼容性问题是因为
 * TS允许我们将不同类型的变量进行赋值，虽然在某些情况下可能产生错误，但其增加了语言的灵活性
 * 类型兼容经常出现在接口、函数、类中
 */

// 接口兼容性
interface X{
    a:any;
    b:any;
}

interface Y{
    a:any;
    b:any;
    c:any;
}

let x1:X = {a:1,b:2};
let y:Y = {a:1,b:2,c:3};
x1 = y  // 允许
// y = x1 //不允许 ,x1缺少了c属性在此处声明了 "c"。
// 源类型，必须具备目标类型的必要属性，就可以进行赋值，接口之间的相互兼容的时候， 成员少的会兼容成员多的

/**
 * 函数的兼容性
 * 判断两个函数是否兼容的时候，通常出现在两个函数相互赋值的情况下，也就是函数作为参数的情况下
 */

type Handler = (a:number,b:number)=> void
function hof(handler:Handler){
    return handler
}
/**
 * 1）参数个数
 */
let hander1 = (a:number) =>{}
hof(hander1)
let hander2 = (a:number,b:number,c:number) =>{}
// hof(hander2) //类型“(a: number, b: number, c: number) => void”的参数不能赋给类型“Handler”的参数。
/**
 * 当函数中有可选参数，和固定参数，剩余参数的时候遵循不同的原则：
 * 1、固定参数可以兼容可选参数和剩余参数的
 * 2、可选参数是不兼容固定参数和剩余参数的，当tsconfig.json设置为strictFunctionTypes：false的时候，可选参数可以兼容
 * 3、剩余参数可以兼容固定参数和可选参数
 */

//可选参数和剩余参数
let a1 = (p1:number,p2:number) =>{}
let b1 = (p1?:number,p2?:number) =>{}
let c1 = (...args:number[]) => {}

a1 = b1
a1 = c1

b1 = a1
b1 = c1 //strictFunctionTypes ：设置为fasle就可以了

c1 = a1
c1 = b1


/**
 * 函数之间的兼容要满足的条件：
 * 1、参数个数的要求
 * 2、参数类型要匹配
 * 3、返回值类型
 */

//2)参数类型
let hander3 = (a:string) =>{}
// hof(hander3) //类型“(a: string) => void”的参数不能赋给类型“Handler”的参数。参数“a”和“a” 的类型不兼容。不能将类型“number”分配给类型“string”

interface Point3D{
    x:number;
    y:number;
    z:number;
}

interface Point2D{
    x:number;
    y:number;
}

/**
 * 参数多的兼容参数少的，把对象看成一个
 * 把对象拆分成参数，把参数多的兼容参数少的
 * @param point 
 */
let p3d = (point:Point3D) => {};
let p2d = (point:Point2D) => {};

p3d = p2d
// p2d = p3d //p2d不兼容p3d。成员个数多的要兼容成员个数少的。//当tsconfig.json设置为strictFunctionTypes：false的时候，可选参数可以兼容

// 函数参数的双向协变

// 函数兼容的第三个条件。返回值类型

//3） 返回值类型 ：TS中规定，目标函数中的返回值类型，必须与源函数中的返回值类型相同。或者为其子类型
let f1 = () => ({name:'Alice'});
let g = () => ({name:'Alice',location:'beijing'})

// f1的返回值类型，是g返回值类型的子类型， 成员少的可以兼容成员多的
f1 = g
// g=f1 //不能将类型“() => { name: string; }”分配给类型“() => { name: string; location: string; }”。 

/**
 * 函数重载
 * 1、函数的列表(目标函数)
 * 2、函数的具体的实现（源函数）
 */
// 函数实现缺失或未立即出现在声明之后
function overload1(a:number,b:number):number;
function overload1(a:string,b:string):string;
// function overload1(a:any,b:any,c:any):any{}; //此重载签名与其实现签名不兼容。
function overload1(a:any,b:any):any{}; //此重载签名与其实现签名不兼容。


// 枚举兼容性
enum Fruit {Apple,Banana}
enum Color{Red,Yellow}

let fruit:Fruit.Apple = 3
let no:number = Fruit.Apple //枚举和number是可以相互兼容的
// let color:Color.Red = Fruit.Apple //枚举之间是完全不兼容的。不能将类型“Fruit.Apple”分配给类型“Color.Red”。

// 类兼容性
/**
 * 类兼容的时候
 * 静态成员和构造函数是不参与比较的
 * 类中含有私有成员的是， 这两个类就不兼容了
 */
class A{
    constructor(p:number,q:number){}
    id:number = 1
    private name:string = ''
}

class B{
    static s=1
    constructor(p:number){}
    id:number = 2
    private name:string = ''
}

let aa = new A(1,2);
let bb = new B(1);

// aa = bb
// bb = aa //类中含有私有成员的是， 这两个类就不兼容了，这个时候只有父类和子类可以相互兼容

// 创建一个A的子类C，此时父类和子类的实例可以完全的兼容
class C2 extends A{}
let cc = new C2(1,2)
aa = cc
cc = aa

// 泛型兼容性
interface Empty<T>{
    value: T
}

// let ob1 : Empty<number> = {}
// let ob2 : Empty<string> = {}
// ob1 = ob2 // 当泛型接口中没有任何的成员的时候，两个变量是兼容的。 当泛型接口中有内容的时候就不兼容了

let logg1 = <T>(x:T):T =>{
    console.log('x')
    return x
}

let logg2 = <U>(y:U):U =>{
    console.log('y')
    return y
}

logg1 = logg2 //如果两个泛型函数的定义相同，但是没有指定类型参数， 那他们之间也是可以相互兼容的

/**
 * 类型兼容的口诀：
 * 结构之间兼容：成员少的兼容成员多的
 * 函数之间兼容：参数多的兼容参数少的
 */