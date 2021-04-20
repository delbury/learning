/**
 * postcss 的配置文件
 */

module.exports = {
  // syntax: an object providing a syntax parser and a stringifier.
  // parser: a special syntax parser (for example, SCSS).
  // stringifier: a special syntax output generator (for example, Midas).
  // map: source map options.
  // from: the input file name (most runners set it automatically).
  // to: the output file name (most runners set it automatically).

  // 使用的插件
  plugins: {
    // 自动添加 css 属性浏览器前缀
    autoprefixer: {
      // 需要适配的浏览器
      // 一般使用项目的 package.json 内的 browserslist 字段
      // 或使用项目跟目录下的 .browserslist 配置文件
      browsers: ['last 2 version'],
    }
  },
  // 数组形式
  // plugins: [
  //   require('autoprefixer'),
  // ],
};