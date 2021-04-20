/* stylelint-disabled */
/**
 * stylelint 的配置文件
 * 
 * 配置优先级
 * a stylelint property in package.json
 * a .stylelintrc file (.json/.yaml/.yml/.js)
 * a stylelint.config.js file exporting a JS object
 * a stylelint.config.cjs file exporting a JS object. 
 *   When running stylelint in JavaScript packages that specify "type":"module" in their package.json
 */

module.exports = {
  /**
   * stylelint的配置可以 extend 一个已存在的配置文件(无论是你自己的还是第三方的配置)。
   * 当一个配置继承了里一个配置，它将会添加自己的属性并覆盖原有的属性。
   * 你也可以将extends设置为一个数组，每一项都是一个独立的stylelint配置项，后一项将会覆盖前一项，而接下来你自己书写的 rules 规则可以覆盖他们所有。
   * extends的值实际上一个定位器（或者一个包含若干定位器的数组），所有可以通过require来使用的资源都可以作为extends的值。
   */
  extends: ['stylelint-config-sass-guidelines'],
  /**
   * rules是一个对象，属性名为规则名称，属性值为规则取值，它告诉stylelint该检查什么，该怎么报错。
   * 所有规则默认都是关闭的。
   */
  rules: {
    'some-rule-set/first-rule': 'nothing',
    'some-rule': null,
    'another-rule': [
      true,
      {
        message: 'custom message',
        severity: 'error', // or warning
        reportDisables: true, // 允许 stylelint-disable 禁用
      }
    ],
  },
  /**
   * 插件一般是由社区提供的，对stylelint已有规则进行扩展，一般可以支持一些非标准的css语法检查或者其他特殊用途。
   * 一个插件会提供一个或者多个检查规则。
   * plugins是一个数组，包含一组插件的定位器，这些定位器的取值跟extends一致。
   * plugins声明后还需要在rules中使用它，具体规则名称以及可能的取值需要去查看每个插件的文档。
   */
  plugins: [
    '../some-rule-set.js',
  ],
  /**
   * 你还可以在stylelint的处理流中加入自己的处理函数，就是这里的processors。
   * processors只能作为  命令行  和  Node API  使用，PostCss的插件会忽略它们。
   * 通过processors，我们可以让styleline去处理html中style标签里面的css代码，MarkDown里面的css代码块或者js里面一段包含css的字符串。
   * processors的每一项也是一个定位器，需要额外的参数时，可以传递一个数组，第一项是定位器，第二项是需要的参数。
   */
  processors: [
    'stylelint-html-processor',
    ['stylelint-html-processor', { optionOne: true, optionTwo: false }]
  ],
  /**
   * 所有在第二个选项中没有指定严重级别的规则的默认严重级别。severity 可用的值为：warning | error
   */
  defaultSeverity: 'warning',
  /**
   * 一个文件匹配规则，或者一组文件匹配规则，来指定需要忽略的文件。
   * 更高效的忽略文件的方法是通过 .stylelintignore 文件匹配规则。
   */
  ignoreFiles: [],
  /**
   * 忽略 stylelint-disable (e.g. / * stylelint-disable block-no-empty * /) 注释
   */
  ignoreDisables: true,
};
