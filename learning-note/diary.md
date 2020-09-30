# 笔记
## 2020-09-07
  - ### JS合法变量名字符 (exp: Ω = 123 | \u03a9 = 123 | \u{3a9} = 123 )
    - JavaScript 有多个版本的标准，标准中与「命名规则」相关的是 identifier name 的部分
    - ID_Start 允许的 Unicode 首字符编码
    - ID_Continue 允许的 Unicode 非首字符编码
## 2019/9/16
  - CSS: var(`<custom-property-name>`, `<declaration-value>?`) 属性值变量，不能包含$，[，^，(，%等字符，普通字符局限在只要是“数字[0-9]”“字母[a-zA-Z]”“下划线_”和“短横线-”这些组合，但是可以是中文，日文或者韩文，CSS中原生的变量定义语法是：--*，变量使用语法是：var(--*)，其中*表示我们的变量名称
  - CSS: shape-rendering: auto | optimizeSpeed | crispEdges | geometricPrecision 指定SVG元素`<Path>`的渲染模式
