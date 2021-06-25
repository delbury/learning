# Framework
## MVC (Model View Controller)
> 一句话描述就是 Controller 负责将 Model 的数据用 View 显示出来，换句话说就是在Controller里面把Model的数据赋值给View

模型(model)－视图(view)－控制器(controller)

Model（模型）：是应用程序中用于处理应用程序数据逻辑的部分。通常模型对象负责在数据库中存取数据。

View（视图）：是应用程序中处理数据显示的部分。通常视图是依据模型数据创建的。

Controller（控制器）：是应用程序中处理用户交互的部分。通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

View和Controller的交互：View 产生 action 目标为 Controller

Model和Controller的交互：关注 Model 中的数据变化

## MVVM (Model View ViewModel)
双向绑定：数据的变动自动反映在视图上，反之亦然