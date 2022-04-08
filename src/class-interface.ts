interface Human{
    // new (name:string):void;//接口不能约束类的构造函数
    name:string;
    eat():void;
}
/**
 * 1、类实现接口的时候必须声明接口中的所有属性
 * 2、接口只能约束类的共有成员
 * 3、接口不能约束类的构造函数
 */
class Asian implements Human{
    constructor(name:string){
        this.name = name;
    }
    // private name: string; //类“Asian”错误实现接口“Human”。属性“name”在类型“Asian”中是私有属性，但在类型“Human”中不是。t
    name:string;
    eat() {}
    sleep(){}
}

/**
 * 接口的继承，可以一个接口继承多个接口
 */
interface Man extends Human{
    run():void
}

interface Child{
    cry():void
}

/**
 * 接口的继承
 * 继承多个接口的时候用","分割
 * 作用：
 * 1、接口的继承可以抽离出可重用的接口
 * 2、接口的继承也可以将多个接口合并成一个接口
 */
interface Boy extends Man,Child{

}

let boy:Boy = {
    name:'hh',
    run(){},
    eat(){},
    cry(){}
}
/**
 * 接口继承类
 * 相当于：接口把类的成员都抽象出来了， 也就说只有类的结构，而没有具体的实现
 */
class Auto{
    state = 1
    // private state2 = 0 //类“C”错误实现接口“AutoInterface”。类型 "C" 中缺少属性 "state2"，但类型 "Auto" 中需要该属性。
}

/**
 * 接口隐涵了state属性
 */
interface AutoInterface extends Auto{

}
/**
 * C实现AutoInterface的接口
 */
class C implements AutoInterface{
    state=1
}

/**
 * 定义一个Auto的子类为Bus，然后用Bus实现AutoInterface接口
 * 这个类中不需要在实现state属性，因为他是Auto的子类，自然继承类这个属性
 * 
 * 注意：
 * 1、接口在抽离类的成员的时候，不仅抽离类的公共成员， 还抽离了类的私有成员和保护成员
 * 
 */
class Bus extends Auto implements AutoInterface{

}