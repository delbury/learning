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


# Webpack
## Webpack 核心概念
- Entry <br>
  入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。<br>
  进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。<br>
  每个依赖项随即被处理，最后输出到称之为 bundles 的文件中。<br>

- Output <br>
  output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。<br>
  基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。<br>

- Module <br>
  模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。<br>

- Chunk <br>
  代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。<br>

- Loader <br>
  loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript 和 JSON）。<br>
  loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。<br>
  本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。<br>

- Plugin <br>
  loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。<br>
  插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。<br>
