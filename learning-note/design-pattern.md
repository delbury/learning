# 设计模式（Design Pattern）
## 原则（Principle）
目的只有一个：降低对象之间的耦合，增加程序的可复用性、可扩展性和可维护性。

- ### 开闭原则（Open Closed Principle，OCP）
  开闭原则的含义是：当应用的需求改变时，在不修改软件实体的源代码或者二进制代码的前提下，可以扩展模块的功能，使其满足新的需求。

- ### 里氏替换原则（Liskov Substitution Principle，LSP）
  里氏替换原则通俗来讲就是：子类可以扩展父类的功能，但不能改变父类原有的功能。（子类继承父类时，除添加新的方法完成新增功能外，尽量不要重写父类的方法）

- ### 依赖倒置原则（Dependence Inversion Principle，DIP）
  其核心思想是：要面向接口编程，不要面向实现编程。依赖倒置原则的目的是通过要面向接口的编程来降低类间的耦合性

- ### 单一职责原则（Single Responsibility Principle，SRP）
  单一职责原则规定一个类应该有且仅有一个引起它变化的原因，否则类应该被拆分

- ### 接口隔离原则（Interface Segregation Principle，ISP）
  接口隔离原则要求程序员尽量将臃肿庞大的接口拆分成更小的和更具体的接口，让接口中只包含客户感兴趣的方法。

- ### 最少知识原则（Least Knowledge Principle，LKP）
  含义是：如果两个软件实体无须直接通信，那么就不应当发生直接的相互调用，可以通过第三方转发该调用。其目的是降低类之间的耦合度，提高模块的相对独立性。

- ### 合成复用原则（Composite Reuse Principle，CRP）
  要求在软件复用时，要尽量先使用组合或者聚合等关联关系来实现，其次才考虑使用继承关系来实现。

---

## 创建型模式（Creational Pattern）
除了工厂方法模式属于类创建型模式，其他的全部属于对象创建型模式
- ### 单例（Singleton）模式
  某个类只能生成一个实例，该类提供了一个全局访问点供外部获取该实例，其拓展是有限多例模式。
  - 优点
    - 单例模式可以保证内存里只有一个实例，减少了内存的开销。
    - 可以避免对资源的多重占用。
    - 单例模式设置全局访问点，可以优化和共享资源的访问。
  - 缺点
    - 单例模式一般没有接口，扩展困难。如果要扩展，则除了修改原来的代码，没有第二种途径，违背开闭原则。
    - 在并发测试中，单例模式不利于代码调试。在调试过程中，如果单例中的代码没有执行完，也不能模拟生成一个新的对象。
    - 单例模式的功能代码通常写在一个类中，如果功能设计不合理，则很容易违背单一职责原则。
  - 结构
    - 单例类：包含一个实例且能自行创建这个实例的类。
    - 访问类：使用单例的类。
  - 实现方式
    - lazy 模式：调用时创建实例
    - hurry 模式：初始化时创建实例
  - 应用场景
    - 需要频繁创建的一些类，使用单例可以降低系统的内存压力，减少 GC。
    - 某类只要求生成一个对象的时候，如一个班中的班长、每个人的身份证号等。
    - 某些类创建实例时占用资源较多，或实例化耗时较长，且经常使用。
    - 某类需要频繁实例化，而创建的对象又频繁被销毁的时候，如多线程的线程池、网络连接池等。
    - 频繁访问数据库或文件的对象。
    - 对于一些控制硬件级别的操作，或者从系统上来讲应当是单一控制逻辑的操作，如果有多个实例，则系统会完全乱套。
    - 当对象需要被共享的场合。由于单例模式只允许创建一个对象，共享该对象可以节省内存，并加快对象访问速度。如 Web 中的配置对象、数据库的连接池等。
  - 示例
    ```js
    class Singleton {}
    let instance = null; // lazy or hurry
    const getSingleton = () => {
      if(!instance) {
        instance = new Singleton();
      }
      return instance;
    };

    getSingleton() === getSingleton(); // true
    ```

- ### 原型（Prototype）模式
  用一个已经创建的实例作为原型，通过复制该原型对象来创建一个和原型相同或相似的新对象。
  - 优点
    - Java 自带的原型模式基于内存二进制流的复制，在性能上比直接 new 一个对象更加优良。
    - 可以使用深克隆方式保存对象的状态，使用原型模式将对象复制一份，并将其状态保存起来，简化了创建对象的过程，以便在需要的时候使用（例如恢复到历史某一状态），可辅助实现撤销操作。
  - 缺点
    - 需要为每一个类都配置一个 clone 方法
    - clone 方法位于类的内部，当对已有类进行改造的时候，需要修改代码，违背了开闭原则。
    - 当实现深克隆时，需要编写较为复杂的代码，而且当对象之间存在多重嵌套引用时，为了实现深克隆，每一层对象对应的类都必须支持深克隆，实现起来会比较麻烦。因此，深克隆、浅克隆需要运用得当。
  - 结构
    - 抽象原型类：规定了具体原型对象必须实现的接口。
    - 具体原型类：实现抽象原型类的 clone() 方法，它是可被复制的对象。
    - 访问类：使用具体原型类中的 clone() 方法来复制新的对象。
  - 实现方式
    - 浅克隆：创建一个新对象，新对象的属性和原来对象完全相同，对于非基本类型属性，仍指向原有属性所指向的对象的内存地址。
    - 深克隆：创建一个新对象，属性中引用的其他对象也会被克隆，不再指向原有对象地址。
  - 应用场景
    - 对象之间相同或相似，即只是个别的几个属性不同的时候。
    - 创建对象成本较大，例如初始化时间长，占用CPU太多，或者占用网络资源太多等，需要优化资源。
    - 创建一个对象需要繁琐的数据准备或访问权限等，需要提高性能或者提高安全性。
    - 系统中大量使用该类对象，且各个调用者都需要给它的属性重新赋值。
  - 扩展
    - 原型模式可扩展为带原型管理器的原型模式，它在原型模式的基础上增加了一个原型管理器 PrototypeManager 类。该类用 HashMap 保存多个复制的原型，Client 类可以通过管理器的 get(String id) 方法从中获取复制的原型。
  - 示例
    ```js
    class Prototype {
      clone() {
        return _clone(this);
      }
    }
    class Some extends Prototype {}
    const obj1 = new Some();
    const obj2 = obj1.clone();
    obj1 !== obj2;
    ```

- ### 简单工厂方法（SimpleFactoryMethod）模式
  简单工厂模式每增加一个产品就要增加一个具体产品类和一个对应的具体工厂类，这增加了系统的复杂度，违背了“开闭原则”。
  - 优点
    - 工厂类包含必要的逻辑判断，可以决定在什么时候创建哪一个产品的实例。客户端可以免除直接创建产品对象的职责，很方便的创建出相应的产品。工厂和产品的职责区分明确。
    - 客户端无需知道所创建具体产品的类名，只需知道参数即可。
    - 也可以引入配置文件，在不修改客户端代码的情况下更换和添加新的具体产品类。
  - 缺点
    - 简单工厂模式的工厂类单一，负责所有产品的创建，职责过重，一旦异常，整个系统将受影响。且工厂类代码会非常臃肿，违背高聚合原则。
    - 使用简单工厂模式会增加系统中类的个数（引入新的工厂类），增加系统的复杂度和理解难度
    - 系统扩展困难，一旦增加新产品不得不修改工厂逻辑，在产品类型较多时，可能造成逻辑过于复杂
    - 简单工厂模式使用了 static 工厂方法，造成工厂角色无法形成基于继承的等级结构。
  - 结构
    - 简单工厂（SimpleFactory）：是简单工厂模式的核心，负责实现创建所有实例的内部逻辑。工厂类的创建产品类的方法可以被外界直接调用，创建所需的产品对象。
    - 抽象产品（Product）：是简单工厂创建的所有对象的父类，负责描述所有实例共有的公共接口。
    - 具体产品（ConcreteProduct）：是简单工厂模式的创建目标。
  - 应用场景
    - 对于产品种类相对较少的情况，考虑使用简单工厂模式。使用简单工厂模式的客户端只需要传入工厂类的参数，不需要关心如何创建对象的逻辑，可以很方便地创建所需产品。
  - 示例
    ```js
    class Product {}
    class A extends Product {}
    class B extends Product {}
    class SimpleFactory {
      static create(type) {
        switch(type) {
          case 'A': return new A();
          case 'B': return new B();
        }
      }
    }
    const a = SimpleFactory.create('A');
    const b = SimpleFactory.create('B');
    ```

- ### 工厂方法（FactoryMethod）模式
  定义一个用于创建产品的接口，由子类决定生产什么产品。
  - 优点：
    - 用户只需要知道具体工厂的名称就可得到所要的产品，无须知道产品的具体创建过程。
    - 灵活性增强，对于新产品的创建，只需多写一个相应的工厂类。
    - 典型的解耦框架。高层模块只需要知道产品的抽象类，无须关心其他实现类，满足迪米特法则、依赖倒置原则和里氏替换原则。
  - 缺点：
    - 类的个数容易过多，增加复杂度
    - 增加了系统的抽象性和理解难度
    - 抽象产品只能生产一种产品，此弊端可使用抽象工厂模式解决。
  - 结构
    - 抽象工厂（Abstract Factory）：提供了创建产品的接口，调用者通过它访问具体工厂的工厂方法 newProduct() 来创建产品。
    - 具体工厂（ConcreteFactory）：主要是实现抽象工厂中的抽象方法，完成具体产品的创建。
    - 抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能。
    - 具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间一一对应。
  - 应用场景：
    - 客户只知道创建产品的工厂名，而不知道具体的产品名。如 TCL 电视工厂、海信电视工厂等。
    - 创建对象的任务由多个具体子工厂中的某一个完成，而抽象工厂只提供创建产品的接口。
    - 客户不关心创建产品的细节，只关心产品的品牌
  - 示例
    ```js
    class Product {}
    class P1 extends Product {}
    class P2 extends Product {}
    class Factory {
      create() {}
    }
    class F1 extends Factory {
      create() { return new P1(); }
    }
    class F2 extends Factory {
      create() { return new P2(); }
    }
    const p1 = new Function(`return new ${F1.name}()`)().create();
    p1.create();
    const p2 = new Function(`return new ${F2.name}()`)().create();
    p2.create();
    ```

- ### 抽象工厂（AbstractFactory）模式
  提供一个创建产品族的接口，其每个子类可以生产一系列相关的产品。
  - 优点
    - 工厂方法模式的优点
    - 可以在类的内部对产品族中相关联的多等级产品共同管理，而不必专门引入多个新的类来进行管理。
    - 当需要产品族时，抽象工厂可以保证客户端始终只使用同一个产品的产品组。
    - 抽象工厂增强了程序的可扩展性，当增加一个新的产品族时，不需要修改原代码，满足开闭原则。
  - 缺点
    - 当产品族中需要增加一个新的产品时，所有的工厂类都需要进行修改。增加了系统的抽象性和理解难度。
  - 结构
    - 抽象工厂（Abstract Factory）：提供了创建产品的接口，它包含多个创建产品的方法 newProduct()，可以创建多个不同等级的产品。
    - 具体工厂（Concrete Factory）：主要是实现抽象工厂中的多个抽象方法，完成具体产品的创建。
    - 抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能，抽象工厂模式有多个抽象产品。
    - 具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间是多对一的关系。
  - 应用场景
    - 当需要创建的对象是一系列相互关联或相互依赖的产品族时，如电器工厂中的电视机、洗衣机、空调等。
    - 系统中有多个产品族，但每次只使用其中的某一族产品。如有人只喜欢穿某一个品牌的衣服和鞋。
    -系统中提供了产品的类库，且所有产品的接口相同，客户端不依赖产品实例的创建细节和内部结构。
  - 扩展
    - 当增加一个新的产品族时只需增加一个新的具体工厂，不需要修改原代码，满足开闭原则。
    - 当产品族中需要增加一个新种类的产品时，则所有的工厂类都需要进行修改，不满足开闭原则。
  - 示例
    ```js
    class P1 {}
    class P2 {}
    class P11 extends P1 {}
    class P12 extends P1 {}
    class P21 extends P2 {}
    class P22 extends P2 {}
    class Factory {
      create1() {}
      create2() {}
    }
    class F1 extends Factory {
      create1() { return new P11(); }
      create2() { return new P21(); }
    }
    class F2 extends Factory {
      create1() { return new P12(); }
      create2() { return new P22(); }
    }
    const p11 = new Function(`return new ${F1.name}()`)().create1();
    const p22 = new Function(`return new ${F2.name}()`)().create2();
    ```

- ### 建造者（Builder）模式
  将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象。
  - 优点
    - 封装性好，构建和表示分离。
    - 扩展性好，各个具体的建造者相互独立，有利于系统的解耦。
    - 客户端不必知道产品内部组成的细节，建造者可以对创建过程逐步细化，而不对其它模块产生任何影响，便于控制细节风险。
  - 缺点
    - 产品的组成部分必须相同，这限制了其使用范围。
    - 如果产品的内部变化复杂，如果产品内部发生变化，则建造者也要同步修改，后期维护成本较大。
  - 结构
    - 产品角色（Product）：它是包含多个组成部件的复杂对象，由具体建造者来创建其各个零部件。
    - 抽象建造者（Builder）：它是一个包含创建产品各个子部件的抽象方法的接口，通常还包含一个返回复杂产品的方法 getResult()。
    - 具体建造者(Concrete Builder）：实现 Builder 接口，完成复杂产品的各个部件的具体创建方法。
    - 指挥者（Director）：它调用建造者对象中的部件构造与装配方法完成复杂对象的创建，在指挥者中不涉及具体产品的信息。
  - 应用场景
    - 相同的方法，不同的执行顺序，产生不同的结果。
    - 多个部件或零件，都可以装配到一个对象中，但是产生的结果又不相同。
    - 产品类非常复杂，或者产品类中不同的调用顺序产生不同的作用。
    - 初始化一个对象特别复杂，参数多，而且很多参数都具有默认值。
  - 扩展
    - 建造者（Builder）模式在应用过程中可以根据需要改变，如果创建的产品种类只有一种，只需要一个具体建造者，这时可以省略掉抽象建造者，甚至可以省略掉指挥者角色。
  - 示例
    ```js
    class Product {
      #partA;
      #partB;
      setPartA(pa) {
        this.#partA = pa;
      }
      setPartB(pb) {
        this.#partB = pb;
      }
      show() {}
    }
    class Builder {
      #product = new Product();
      buildPartA() {
        this.#product.setPartA('part A');
      }
      buildPartB() {
        this.#product.setPartB('part B');
      }
      getResult() {
        return this.#product;
      }
    }
    class Director {
      constructor(builder) {
        builder.buildPartA();
        builder.buildPartB();
        return builder.getResult();
      }
    }
    const builder = new Builder();
    const product = new Director(builder);
    ```

---

## 结构型模式
- ### 代理（Proxy）模式：
  为某对象提供一种代理以控制对该对象的访问。即客户端通过代理间接地访问该对象，从而限制、增强或修改该对象的一些特性。
  - 优点
    - 代理模式在客户端与目标对象之间起到一个中介作用和保护目标对象的作用；
    - 代理对象可以扩展目标对象的功能；
    - 代理模式能将客户端与目标对象分离，在一定程度上降低了系统的耦合度，增加了程序的可扩展性
  - 缺点
    - 代理模式会造成系统设计中类的数量增加
    - 在客户端和目标对象之间增加一个代理对象，会造成请求处理速度变慢；
    - 增加了系统的复杂度；
  - 结构
    - 抽象主题（Subject）类：通过接口或抽象类声明真实主题和代理对象实现的业务方法。
    - 真实主题（Real Subject）类：实现了抽象主题中的具体业务，是代理对象所代表的真实对象，是最终要引用的对象。
    - 代理（Proxy）类：提供了与真实主题相同的接口，其内部含有对真实主题的引用，它可以访问、控制或扩展真实主题的功能。
  - 实现方式
    - 静态：由程序员创建代理类或特定工具自动生成源代码再对其编译，在程序运行前代理类的 .class 文件就已经存在了。
    - 动态：在程序运行时，运用反射机制动态创建而成
  - 应用场景
    - 远程代理，这种方式通常是为了隐藏目标对象存在于不同地址空间的事实，方便客户端访问。例如，用户申请某些网盘空间时，会在用户的文件系统中建立一个虚拟的硬盘，用户访问虚拟硬盘时实际访问的是网盘空间。
    - 虚拟代理，这种方式通常用于要创建的目标对象开销很大时。例如，下载一幅很大的图像需要很长时间，因某种计算比较复杂而短时间无法完成，这时可以先用小比例的虚拟代理替换真实的对象，消除用户对服务器慢的感觉。
    - 安全代理，这种方式通常用于控制不同种类客户对真实对象的访问权限。
    - 智能指引，主要用于调用目标对象时，代理附加一些额外的处理功能。例如，增加计算真实对象的引用次数的功能，这样当该对象没有被引用时，就可以自动释放它。
    - 延迟加载，指为了提高系统的性能，延迟对目标的加载。例如，Hibernate 中就存在属性的延迟加载和关联表的延时加载。
  - 扩展
    - 真实主题与代理主题一一对应，增加真实主题也要增加代理。设计代理以前真实主题必须事先存在，不太灵活。采用动态代理模式可以解决以上问题
  - 示例
    ```js
    class Subject {
      run() {}
    }
    class RealSubject extends Subject {
      run() {}
    }
    class Proxy extends Subject {
      #real;
      constructor(sub) {
        this.#real = sub;
      }
      run() {
        this.beforeRun();
        this.#real.run();
        this.afterRun();
      }
      beforeRun() {}
      afterRun() {}
    }
    ```
- ### 适配器（Adapter）模式：
  将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类能一起工作。
  - 优点
    - 客户端通过适配器可以透明地调用目标接口。
    - 复用了现存的类，程序员不需要修改原有代码而重用现有的适配者类。
    - 将目标类和适配者类解耦，解决了目标类和适配者类接口不一致的问题。
    - 在很多业务场景中符合开闭原则。
  - 缺点
    - 适配器编写过程需要结合业务场景全面考虑，可能会增加系统的复杂性。
    - 增加代码阅读难度，降低代码可读性，过多使用适配器会使系统代码变得凌乱。
  - 结构
    - 目标（Target）接口：当前系统业务所期待的接口，它可以是抽象类或接口。
    - 适配者（Adaptee）类：它是被访问和适配的现存组件库中的组件接口。
    - 适配器（Adapter）类：它是一个转换器，通过继承或引用适配者的对象，把适配者接口转换成目标接口，让客户按目标接口的格式访问适配者。
  - 应用场景
    - 以前开发的系统存在满足新系统功能需求的类，但其接口同新系统的接口不一致。
    - 使用第三方提供的组件，但组件接口定义和自己要求的接口定义不同。
  - 示例
    ```js
    class Target {
      action() {}
    }
    class Adaptee {
      run() {}
    }
    class Adaptor extends Target {
      #adaptee;
      constructor(adaptee) {
        this.#adaptee = adaptee;
      }
      action() {
        return this.adaptee.run()
      }
    }
    const adaptee = new Adaptee();
    const adapter = new Adaptor(adaptee);
    adapter.action();
    ```

- ### 桥接（Bridge）模式：
  将抽象与实现分离，使它们可以独立变化。它是用组合关系代替继承关系来实现的，从而降低了抽象和实现这两个可变维度的耦合度。
  - 优点
    - 抽象与实现分离，扩展能力强
    - 符合开闭原则
    - 符合合成复用原则
    - 其实现细节对客户透明
  - 缺点
    - 由于聚合关系建立在抽象层，要求开发者针对抽象化进行设计与编程，能正确地识别出系统中两个独立变化的维度，这增加了系统的理解与设计难度。
  - 结构
    - 抽象化（Abstraction）角色：定义抽象类，并包含一个对实现化对象的引用。
    - 扩展抽象化（Refined Abstraction）角色：是抽象化角色的子类，实现父类中的业务方法，并通过组合关系调用实现化角色中的业务方法。
    - 实现化（Implementor）角色：定义实现化角色的接口，供扩展抽象化角色调用。
    - 具体实现化（Concrete Implementor）角色：给出实现化角色接口的具体实现。
  - 应用场景
    - 当一个类存在两个独立变化的维度，且这两个维度都需要进行扩展时。
    - 当一个系统不希望使用继承或因为多层次继承导致系统类的个数急剧增加时。
    - 当一个系统需要在构件的抽象化角色和具体化角色之间增加更多的灵活性时。
  - 示例
    ```js
    class A {
      run() {}
    }
    class B {
      constructor(a) {
        this.a = a;
      }
      action() {
        this.a.run();
      }
    }
    ```

- ### 装饰（Decorator）模式：
  在不改变现有对象结构的情况下，动态地给对象增加一些职责，即增加其额外的功能。
  - 优点
    - 装饰器是继承的有力补充，比继承灵活，在不改变原有对象的情况下，动态的给一个对象扩展功能，即插即用
    - 通过使用不用装饰类及这些装饰类的排列组合，可以实现不同效果
    - 装饰器模式完全遵守开闭原则
  - 缺点
    - 装饰器模式会增加许多子类，过度使用会增加程序得复杂性。
  - 结构
    - 抽象构件（Component）角色：定义一个抽象接口以规范准备接收附加责任的对象。
    - 具体构件（ConcreteComponent）角色：实现抽象构件，通过装饰角色为其添加一些职责。
    - 抽象装饰（Decorator）角色：继承抽象构件，并包含具体构件的实例，可以通过其子类扩展具体构件的功能。
    - 具体装饰（ConcreteDecorator）角色：实现抽象装饰的相关方法，并给具体构件对象添加附加的责任。
  - 应用场景
    - 当需要给一个现有类添加附加职责，而又不能采用生成子类的方法进行扩充时。例如，该类被隐藏或者该类是终极类或者采用继承方式会产生大量的子类。
    - 当需要通过对现有的一组基本功能进行排列组合而产生非常多的功能时，采用继承关系很难实现，而采用装饰器模式却很好实现。
    - 当对象的功能要求可以动态地添加，也可以再动态地撤销时。
  - 示例
    ```js
    class Component {
      run() {}
    }
    class RealComponent extends Component {
      run() {}
    }
    class Decorator extends Component {
      constructor(comp) {
        this.comp = comp;
      }
      run() {
        this.comp.run();
      }
    }
    class RealDecorator extends Decorator {
      constructor(comp) {
        super(comp);
      }
      run() {
        super.run();
        // ...
      }
    }
    ```


- ### 外观（Facade）模式：
  为多个复杂的子系统提供一个一致的接口，使这些子系统更加容易被访问。
  - 优点
    - 降低了子系统与客户端之间的耦合度，使得子系统的变化不会影响调用它的客户类。
    - 对客户屏蔽了子系统组件，减少了客户处理的对象数目，并使得子系统使用起来更加容易。
    - 降低了大型软件系统中的编译依赖性，简化了系统在不同平台之间的移植过程，因为编译一个子系统不会影响其他的子系统，也不会影响外观对象。
  - 缺点
    - 不能很好地限制客户使用子系统类，很容易带来未知风险。
    - 增加新的子系统可能需要修改外观类或客户端的源代码，违背了“开闭原则”。
  - 结构
    - 外观（Facade）角色：为多个子系统对外提供一个共同的接口。
    - 子系统（Sub System）角色：实现系统的部分功能，客户可以通过外观角色访问它。
    - 客户（Client）角色：通过一个外观角色访问各个子系统的功能。
  - 应用场景
    - 对分层结构系统构建时，使用外观模式定义子系统中每层的入口点可以简化子系统之间的依赖关系。
    - 当一个复杂系统的子系统很多时，外观模式可以为系统设计一个简单的接口供外界访问。
    - 当客户端与多个子系统之间存在很大的联系时，引入外观模式可将它们分离，从而提高子系统的独立性和可移植性。
  - 扩展
    - 在外观模式中，当增加或移除子系统时需要修改外观类，这违背了“开闭原则”。如果引入抽象外观类，则在一定程度上解决了该问题
  - 示例
    ```js
    class Sub1 {
      action1() {}
    }
    class Sub2 {
      action2() {}
    }
    class Facade {
      #sub1 = new Sub1();
      #sub2 = new Sub2();
      action() {
        this.#sub1.action1();
        this.#sub2.action2();
      }
    }
    ```

- ### 享元（Flyweight）模式：
  运用共享技术来有效地支持大量细粒度对象的复用。
  - 优点
    - 相同对象只要保存一份，这降低了系统中对象的数量，从而降低了系统中细粒度对象给内存带来的压力。
  - 缺点
    - 为了使对象可以共享，需要将一些不能共享的状态外部化，这将增加程序的复杂性。
    - 读取享元模式的外部状态会使得运行时间稍微变长。
  - 结构
    - 抽象享元角色（Flyweight）：是所有的具体享元类的基类，为具体享元规范需要实现的公共接口，非享元的外部状态以参数的形式通过方法传入。
    - 具体享元（Concrete Flyweight）角色：实现抽象享元角色中所规定的接口。
    - 非享元（Unsharable Flyweight)角色：是不可以共享的外部状态，它以参数的形式注入具体享元的相关方法中。
    - 享元工厂（Flyweight Factory）角色：负责创建和管理享元角色。当客户对象请求一个享元对象时，享元工厂检査系统中是否存在符合要求的享元对象，如果存在则提供给客户；如果不存在的话，则创建一个新的享元对象。
  - 应用场景
    - 系统中存在大量相同或相似的对象，这些对象耗费大量的内存资源。
    - 大部分的对象可以按照内部状态进行分组，且可将不同部分外部化，这样每一个组只需保存一个内部状态。
    - 由于享元模式需要额外维护一个保存享元的数据结构，所以应当在有足够多的享元实例时才值得使用享元模式。
  - 扩展
    - 单纯享元模式，这种享元模式中的所有的具体享元类都是可以共享的，不存在非共享的具体享元类
    - 复合享元模式，这种享元模式中的有些享元对象是由一些单纯享元对象组合而成的，它们就是复合享元对象。虽然复合享元对象本身不能共享，但它们可以分解成单纯享元对象再被共享
  - 示例
    ```js
    class Unshared {
      #msg;
    }
    class Flyweight {
      #key;
      action(unshared) {}
    }
    class Factory {
      #map = new Map();
      getFlyweight(key) {
        if(this.#map.has(key)) {
          return this.#map.get(key);
        } else {
          const inst = new Flyweight(key)
          this.#map.set(key, inst);
          return inst;
        }
      }
    }
    ```

- ### 组合（Composite）模式：
  将对象组合成树状层次结构，使用户对单个对象和组合对象具有一致的访问性。
