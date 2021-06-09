/**
 * 实现函数体
 */
const foo = function(...args) {
  // 需要实现的部分
  const fn = (...ps) => foo(...[...args, ...ps]);
  fn.getValue = () => console.log(args.reduce((a, b) => a + b));
  return fn;
};


// 输出参数和
const f1 = foo(1, 2, 3);
f1.getValue(); // 6
const f2 = foo(1)(2)(3);
f2.getValue(); // 6
const f3 = foo(1)(2)(3)(4);
f3.getValue(); // 10