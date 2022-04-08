/**
 * 数字枚举
 * 五个枚举成员，他们的取值从0开始,后面的成员相应的递增
 */
enum Role {
    Reporter,
    Developer,
    Maintainer,
    Owner,
    Guest
}
console.log(Role.Reporter)
console.log(Role)

/**
 * 字符串枚举，不可以进行反向映射的
 * 
 */
enum Message {
    Success = '恭喜你，成功了',
    Fail = '抱歉，失败了'
}

/**
 * 异构枚举
 * 可以把字符串枚举和数字枚举混用，就构成了异构枚举，但是实际开发不推荐这样写
 */
enum Answer{
    N,
    Y = 'Yes'
}


/**
 * 枚举成员
 */
// Role.Reporter = 2 //只读类型
enum Char {
    // const
    a, // 没有初始值的情况，常量枚举
    b = Char.a,//常量枚举
    c = 1+3, //常量枚举，常量的表达式

    // computed 需要被计算的成员， 在程序执行阶段才会被计算（运行时才会被计算）
    d = Math.random(),
    e = '123'.length, // computed后的成员一定要为它赋值赋予初始值。
}

/**
 * 常量枚举
 * 特性：在编译阶段被移除
 * 作用：但我们不需要对象，而需要对象的值的时候， 就可以用常量枚举，可以减少我们在编译环境的代码
 */
const enum Month{
    Jan,
    Feb,
    Mar
}

let month = [Month.Jan,Month.Feb,Month.Mar]


/**
 * 枚举类型
 **/ 

enum E {a,b}
enum F {a=0, b=1}
enum G {a='apple',b='banana'}

let e:E = 3
let f:F = 3
// 两种不同的枚举是不能进行比较的
// e === f 

let e1:E.a
let e2:E.b
let e3:E.a

let g1:G = G.b || G.a
let g2:G.a = G.a
