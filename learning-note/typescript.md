# Typescript
## 声明文件 (`*.d.ts`)
### 全局变量的声明文件 (通过 `<script>` 标签引入第三方库，注入全局变量)
#### 语法
  - `declare var`
  - `declare let`
  - `declare const` 不可修改
  - `declare function` 函数重载
  - `declare class` 只能用来定义类型，不能用来定义具体的实现
  - `declare enum` 外部枚举
  - `declare namespace` 命名空间，内部子属性不使用 `declare`，嵌套的命名空间
  - `interface` 声明一个全局的接口，在其他文件中也可以使用，可以声明合并
  - `type` 声明一个全局的类型，在其他文件中也可以使用，不能声明合并

### npm包 (`import package from 'package'`)
#### 说明
  >- 通过 import 导入 foo 的时候，也会去 `types | typings` 目录下寻找对应的模块的声明文件
  >- npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用 `declare` 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 `export` 导出，然后在使用方 `import` 导入后，才会应用到这些类型声明。
#### 方式
  - 与 npm 包绑定在一起，`package.json` 中的 `types` 或 `typings` 字段，或者有一个 `index.d.ts` 声明文件
  - 发布到 `@types`， `npm install @types/package -D`
  - 自己写，放到`node_modules/@types/package/index.d.ts`
  - 创建 `types` 目录，专门管理声明文件，需要配置 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段
#### 语法
  - `export` 导出变量
  - `export namespace` 导出（含有子属性的）对象
  - `export default` ES6 默认导出
  - `export = ` commonjs 导出模块
  - `import package = require('package')`
  - `export as namespace package`

### 扩展全局变量
#### 方式
  - `interface` 声明合并，直接扩展
  - `declare namespace` 直接扩展
  - `declare global` 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型（注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。）

### 模块插件
#### 方式
  - `declare module 'xxx'` 有时通过 `import` 导入一个模块插件，可以改变另一个原有模块的结构。此时如果原有模块已经有了类型声明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。ts 提供了一个语法 `declare module`，它可以用来扩展原有模块的类型。

### 声明文件中的依赖
#### 用处
  - 当我们在书写一个全局变量的声明文件时
  - 当我们需要依赖一个全局变量的声明文件时
  - 拆分声明文件
#### 方式
  - `/// <reference types="package" />` （注意，三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释。）
  - `/// <reference path="xx/xx.d.ts" />` 路径形式