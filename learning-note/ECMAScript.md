# ECMAScript
## ES2023
  1. 从后向前查找数组，Array.prototype.findLast() | Array.prototype.findLastIndex()
  2. hashbang 也称为 shebang，即文件开头指定js执行的解释器，#!usr/bin/env node
  3. WeakMap 支持使用 Symbol 作为 key
  4. 不改变原数组的数组方法，会返回数组副本，
     - 数组反转：Array.prototype.toReversed()
     - 数组排序： Array.prototype.toSorted()
     - 数组分割： Array.prototype.toSpliced()
     - 修改下标（支持负数）对应的值 Array.prototype.width(index, newVal)
## ES2022
  1. 正则表达式flag: d，在 indices 中返回匹配项的开始和结束索引
  2. Top-Level await，可以在模块文件的顶层直接使用 await
  3. 数组 .at 方法，可以查询负数索引的值，例 arr.at(-1) <==> arr[arr.length - 1]
  4. Object.hasOwn 方法，用来替代 Object.prototype.hasOwnProperty.call(obj, prop) <==> Object.hasOwn(obj, prop)
  5. Error cause，可以重新抛出包含 cause 的错误，如 throw new Error("some reason", { cause: err });
  6. class 私有字段、私有方法、私有访问器，如 #name | #setAge() | get #getAge() {}
  7. class 静态字段、静态方法，如 static Age | static GetAge() {}
  8. class 静态私有字段、静态私有方法、私有静态访问器，如 static #Age | static #GetAge() {}
  9. 可以使用 in 判断 class 实例中是否有私有字段，如 #name in instance
  10. 静态代码块 static { // ... }
---
## ES2021
  1. String.prototype.replaceAll()
  2. Promise.any() 只要有一个 resolve
  3. 逻辑操作符和赋值表达式 &&=, ||=, ??=
  4. 数值分隔符 1000_0000.0000_0001
  5. Intl.ListFormat
  6. Intl.DateTimeFormat 的 dateStyle 和 timeStyle 选项
---
## ES2020
  1. class 私有变量 #name
  2. Promise.allSettled 所有Promise完成时完成
  3. 合并空运算符 ??
  4. 可选连接操作符 ?.
  5. BigInt
  6. import() 动态引入
---
## ES2019
  1. Catch Binding
  2. JSON 超集
  3. Symbol Description
  4. Function.prototype.toString() 输出包括注释
  5. Object.fromEntries
  6. Well-formed JSON.stringify
  7. String.prototype. trimStart() 和 trimEnd()
  8. Array.prototype. flat() 和 flatMap()
---
## ES2018
  1. Object 的 Rest (剩余) / Spread (展开) 属性
  2. for await (let xx of yy) 异步迭代
  3. Promise.prototype.finally()
  4. 后行断言 (lookbehind): (?<=x)y, (?<!x)y
  5. 正则表达式 Unicode 属性转义 \p{...} 和 \P{...}
  6. 正则表达式 命名捕获组 (Named capturing groups)
  7. 正则表达式 dotAll 模式 "s" flag
---
## ES2017
  1. String.prototype. padStart() 和 padEnd()
  2. Object.values()
  3. Object.entries()
  4. Object.getOwnPropertyDescriptors()
  5. 函数参数列表和调用中的尾随逗号
  6. Async Function
  7. SharedArrayBuffer
  8. Atomics
---
## ES2016
  1. Array.prototype.includes()
  2. 幂运算 a ** b
---
