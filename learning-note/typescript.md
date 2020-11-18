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