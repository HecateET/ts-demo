/**
 * 泛型定义一个函数
 * 1、类型T不需要预先规定，类似any
 * 2、可以保证输入的参数和返回值是一致的
 */
function log<T>(value: T):T{
    console.log(value);
    return value;
}


/**
 * 调用方式
 * 1、在调用的时候直接指明T的类型
 */
log<string[]>(['a','b'])

/**
 * 调用方式
 * 2、利用TS的类型推断， 省略类型的参数，直接传入一个数组，（比较推荐）
 */
log(['a','b'])


/**
 * 泛型定义一个函数类型
 * 类型别名定义一个泛型函数类型
 */
// type Log = <T>(value:T)=> T
// let myLog: Log = log // 完成了一个泛型函数的实现


/**
 * 泛型接口
 * 和类型别名的形式是等价的
 * 还可以用泛型来约束接口的其他成员。
 * 注意：当泛型变量约束了整个接口的时候，的实现的时候，必须实现整个类型
 */
interface Log<T = string>{
    <T>(value:T):T
}

let myLog: Log = log
myLog('1')

/**
 * 小结：
 * 1、把泛型变量与函数的参数等同对待， 泛型的参数代表类型，而不是实际的参数。
 * 2、泛型还能约束类的成员
 */

/**
 * 泛型类与泛型约束
 * 注意：泛型不能运用在类的静态成员
 * 静态成员不能引用类类型参数。
 */
class Log1<T>{
    run(value:T){
        console.log(value)
        return value
    }
}

// 实例化类
let log1 = new Log1<number>()
log1.run(1)

let log2 = new Log1<string>()
log2.run('1')

/**
 * 泛型约束
 * 1、首先先预定一一个接口
 * 
 */
interface Length{
    length: number
}
//2、然后将类型T继承这个接口（表示T受到了约束，不管是什么类型，但必须要有length属性）
function log3<T extends Length>(value:T):T{
    console.log(value,value.length) // 静态成员不能引用类类型参数。
    return value
}
log3([1])
log3('123')
log3({length:1})

/**
 * 泛型的好处：
 * 1、函数和类可以轻松的支持多种类型，增强程序的扩展性
 * 2、不必写多条函数重载，冗长的联合类型生命，增强代码可读性
 * 3、灵活控制类型之间的约束
 */