class Dog{
    // protected constructor(name:string){ // protected的时候，表示这个类不能被实例化，只能被继承。
    constructor(name:string){ //为构造函数的参数新增了类型注解
        this.name = name
    }
    name?:string //成员属性新增了类型注解 ,?可选属性
    run(){}
    private pri(){}
    protected pro(){} //受保护的属性
    readonly legs:number=1 //只读属性
    static food:string = 'bones' //类的静态成员只能通过类名来调用，不能通过子类来调用，可以被继承
}
/**
 * 1、无论在ES还是TS中， 类成员到属性都是实例属性，而不是原型属性、类成员的方法都是实例方法
 * 3、与ES6中不同的是：实例的属性必须要有初始值，或者在构造函数中被初始化
 */
 console.log(Dog.prototype)
 let dog = new Dog('wangwang')
 console.log(dog)
//  dog.pri()
// dog.pro()
console.log(Dog.food)

 /**
  * 类的继承
  */
 class Husky extends Dog{
     constructor(name:string,color:string){
         super(name)
         this.color = color;//this一定要在super之后调用
        //  this.pri()
        this.pro
     }
     color:string
 }
 let husky = new Husky('haha','red')

 /**
  * 抽象类：
  * 只能被继承，而不能被实例化的类
  * abstract关键字
  * 好处：可以抽离出一些事务的共性，有利于代码的复用和扩展
  * 可以实现多态：在父类中定义一个抽象方法，在多个子类中对这个方法有不同的实现，在程序运行的时候会根据不同的对象进行不同的操作， 这样就实现了运行时的绑定。
  */
 abstract class Animal{
    eat(){
        console.log('eat')
    }
    //抽象类中可以不指定方法的具体实现，就构成了抽象方法
    abstract sleep():void
 }

//  let animal = new Animal()//constructor Animal(): Animal抽象类： 只能被继承，而不能被实例化的类 abstract关键字
class Dog1 extends Animal{
    constructor(name:string){
        super()
        this.name = name
    }
    name:string
    run() {}
    sleep(){
        console.log('dog sleep')
    }
}
let dog1 = new Dog1('wangwang');
dog1.eat();

/**
 * 多态
 */
class Cat extends Animal{
    sleep(){
        console.log('Cat Sleep')
    }
}

let cat = new Cat();

let animals:Animal[] = [dog1,cat]
animals.forEach(i =>{
    i.sleep()
})

class WorkFlow{
    step1(){
        return this
    }
    step2(){
        return this
    }
}

new WorkFlow().step1().step2() //实现了方法的链式调用

/**
 * this的多态，即this可以是父类类型，也可以是子类类型
 */

class Myflow extends WorkFlow{
    next(){
        return this
    }
}

new Myflow().next().step1().next().step2();
/**
 * 小结：
 * ts和ES类的差别，ts补齐了ES类所缺失的， 这样更像一门面向对象语言
 */