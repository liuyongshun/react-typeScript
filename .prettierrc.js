module.exports = {
  // 结尾逗号
  trailingComma: "es5",
  // 制表符宽度
  tabWidth: 2,
  // 是否使用tab
  useTabs: false,
  // 是否使用分号
  semi: false,
  // 换行的字符长度
  printWidth: 120,
  // 单引号
  singleQuote: true,
  // jsx 中单引号代替双引号
  jsxSingleQuote: false,
  // 大括号前后空格 true { foo: bar }
  bracketSpacing: true,
  /** 
   * 在jsx中把'>' 是否单独放一行 
   * false
   * <button
      className="prettier-class"
      onClick={this.handleClick}
    >
    Click Here
    </button>
   */
  jsxBracketSameLine: true,
  // avoid : x => x  always: (x) => x
  arrowParens: 'avoid',
  // 可以将自己限制为仅在文件顶部格式化包含特殊注释（称为pragma）的文件
  // 例如，提供以下内容作为其第一个注释的文件将被格式化 --require-pragma：
  // /**
  //  * @prettier
  //  */
  // 或者
  // /**
  //  * @format
  //  */
  requirePragma: false,
  // 在文本文件中存在两种常用的行结尾的风格。那是\n（或LF换行）和\r\n（或CRLF用于回车+换行），设置行尾风格。
  endOfLine: 'lf'

}
