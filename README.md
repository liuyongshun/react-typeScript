<!-- @format -->


### 一、基础结构搭建

1、安装 node

2、新建一个文件，执行 npm init,初始化 package.json

3、搭建基础目录结构

```
├── build                  // webpack 配置文件
│   └── webpack.common.js
├── package.json
├── public
│   └── index.html
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── config
│   ├── pages
│   ├── redux
│   ├── router           // router有两种常用的形式，一种是统一维护。 react-router的v4建议采用一种是层级嵌套维护。
│   ├── styles
└── └── utils

```

### 二、webpack 配置

1、安装 webpack 和 webpack-cli 脚手架。`webpack webpack-cli`

2、另外我们需要 index.html 文件承载打包出来的 bundle.js 文件，需要安装 `html-webpack-plugin`

3、开发环境我们需要热更新，安装`webpack-dev-server`

4、配置 npm 命令，在 package.json 的 scripts 里配置命令

```
// --config 是自己指定配置文件。
// --open 是自动打开浏览器。

"scripts": {
  "dev": "webpack-dev-server --config build/webpack.config.js --open"
}
```

**此时的配置代码**

```
// webpack.config.js

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8099,
    historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    overlay: {                // 错误和警告覆盖蒙版
      errors: true,
    },
    inline: true,             // 行内模式将热更新代码插入到bundle内，另一种是iframe模式。
    hot: true,
  },
}

```

**此时目录结构**

```
├── build
│   └── webpack.config.js
├── package.json
├── public
│   └── index.html
└── src
    ├── index.js
    └── pages
        └── index.js
```

### 三、react + react-router + es6 搭建

1、安装 react 相关工具`react`和`react-dom`

2、安装es6依赖

- 安装 es6 工具 `@babel/core @babel/preset-env babel-loader`,

- 对于 react 需要安装`@babel/preset-react`

- 动态导入`@babel/plugin-syntax-dynamic-import`

- class类的属性尖头函数支持 `@babel/plugin-proposal-class-properties`

例：
```
class A {
  ff = () => {}
}
```

3、配置 babel.config.js

```
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins': [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties'
  ]
}
```

4、配置 webpack.config.js

```
 module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, '../src')
    }]
  }
```

5、配置最简单的页面内容

```
// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/index'
ReactDOM.render(<App />, document.getElementById('root'))


// src/pages/index.js

import React, { Component } from 'react'
class App extends Component {
  render() {
    return (
      <div>hello world</div>
    )
  }
}
export default App
```

**操作到这里，一个简单的 react 页面已经跑起来了，但是很显然这些东西是不够的，一个完整的项目工程，还需要很多东西。如果上面的基本配置完成并且跑起了项目，那就接着往下走吧。整个流程下来，最后要实现的是完整的开发，构建打包内容，能够支撑项目的运作。**


### 四、less 或 sass 或 stylus

#### css

1、安装依赖

- `css-loader` 加载.css 文件，并转换成 js 对象

- `style-loader`，将样式通过 style 标签插入 head 标签内

2、配置 webpack.config.js

```
// 在relus里增加如下代码。

{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}
```

**ps:**

- 这里有个要注意的点，样式加载器的顺序，先 css-loader 在 style-loader

- webpack 的 loader 采用了函数的 compose（组合）方式，而不是 pipe（管道），compose 方式的执行顺序是从右到左，pipe 的执行顺序是从左到右

3、在 src 下新建 style 文件，然后里面新建 common.css。并且导入到 pages/index.js 页面

```
// src/pages/index.js

import '../style/common.css'

```

#### less

1、假如使用 less，只需要安装`less 和 less-loader`,在 webpack.config.js 的配置中的加入下面的配置

```
{
  test: /\.less$/,
  use: [
    'style-loader',
    'css-loader',
    'less-loader'
  ]
}
```

#### sass

1、假如使用 sass，需要安装`sass-loader node-sass`，在 webpack.config.js 中配置如下

```
{
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
}
```
#### stylus

1、假如使用 stylus，需要安装`stylus-loader stylus`，在 webpack.config.js 中配置如下

```
{
  test: /\.styl$/,
  use: [
    'style-loader',
    'css-loader',
    'stylus-loader'
  ]
}
```

**注意**

- less-loader 依赖于 less，有时候出现 peerDependencies WARNING less-loader@\* requires a peer of less@^2.3.1 || ^3.0.0 but none was installed，自己手动安装一下 less 即可

- 记住：遇到 peerDependencies WARNING，什么依赖未能安装时，记得手动安装即可。或者用 yarn 更稳妥

#### 五、配置图片，字体文件资源加载

1、字体和图片资源需要依赖 file-loader。另外还有 url-loader 可以作为解决方案，url-loader 可以处理小资源转化为 base64 格式。url-loader 依赖于 file-loader。

```
 {
  test: /\.(png|svg|jpg|git)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10240
      }
    }
  ]
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10240
      }
    }
  ]
}
```

### 六、eslint + pretter 规范代码

- 安装 eslint 相关插件 `eslint`, 可以将错误展示在termial 终端的控制台上 `eslint-loader`

- 安装 `babel-eslint` 对Babel解析器的包装，使其能够与 ESLint 兼容

- react 语法校验 `eslint-plugin-react`

- 使用airbnb 规范 `eslint-config-airbnb`

- 支持对ES2015+ (ES6+) import/export校验, 检测文件路径拼错或者是导入名称错误`eslint-plugin-import`

- 该依赖包专注于检查JSX元素的可访问性，`eslint-plugin-jsx-a11y`

- 借助webpack的配置来辅助eslint解析，最有用的就是alias，从而避免unresolved的错误`eslint-import-resolver-webpack`

- 该插件辅助Eslint可以平滑地与Prettier一起协作,将 prettier 作为 ESLint 规范来使用 `eslint-plugin-prettier`

- 禁用掉所有的可能与pretter冲突的格式化相关的规则`eslint-config-prettier`

**配置`.eslintrc.js`文件**

```
module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true
  },
  settings: {
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect'
    },
    // 解决 eslint 无法解析bebpack导入的错误提示
    'import/resolver': {
      webpack: {
        config: './build/webpack.config.js'
      }
    }
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/jsx-one-expression-per-line': 'off', // 关闭要求一个表达式必须换行的要求，和Prettier冲突
    'react/jsx-wrap-multilines': 'off', // 关闭要求jsx属性中写jsx必须要加括号，和Prettier冲突
    'jsx-a11y/no-static-element-interactions': 'off', // 关闭非交互元素加事件必须加 role
    'jsx-a11y/click-events-have-key-events': 'off', // 关闭click事件要求有对应键盘事件
    // 'react/jsx-filename-extension': 'off', // 关闭airbnb对于jsx必须写在jsx文件中的设置
    // 'react/prop-types': 'off', // 关闭airbnb对于必须添加prop-types的校验
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
    // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
}

```

**配置.prettierrc.js**

```
module.exports = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  insertPragma: false,
  tabWidth: 2,
  alwaysParens: 'always',
  useTabs: false
}
```

**配置 webpack.config.js**

```
{
  test: /\.jsx?$/,
  use: ['babel-loader', 'eslint-loader'],
  include: path.join(__dirname, '../src')
},
```

**pretter 自动格式化**

- vs code 安装 eslint 插件和 prettier-code 插件。设置如下配置。preferences —— setting —— 点击右上角的图标打开 json 文件

```
// 保存自动格式化
"editor.formatOnSave": true,
 "eslint.run": "onSave",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue",
        {
            "language": "html",
            "autoFix": true
        },
    ],
    "eslint.options": {
        "extensions": [
            ".js",
            ".vue",
            ".jsx"
        ]
    },
```

### 七 hook 校验

配合 husky 和 lint-staged 在 git 提交时自动格式化代码

1、 安装依赖，`husky lint-staged`

2、 配置 package.json

```
// script 增加
 "scripts": {
   "lint": "eslint src --fix"
}

// scripts同级
 "husky": {
   "hooks": {
      "pre-commit": "npm run lint"
    }
},
```

**到这里基本的配置，规范什么的算是配置完成了，然后接下来就是一些高级一点的配置。例如 webpack 的优化**

### 八、webpack 构建优化项目

#### 缩小构建目标，打包作用域

1、exclude/include 确定 loader 规则范围，减少 loader 分析

```
{
  test: /\.jsx?$/,
  use: ['babel-loader'],
  include: path.join(__dirname, '../src'),
  exclude: /(node_modules|bower_components)/,
}
```

2、resolve.modules 指明第三方模块的绝对路径 (减少不必要的路径分析，查找)

3、resolve.extensions 指定拓展名，尽可能减少后缀尝试的操作

4、合理使用alias，减少路径分析操作,
webpack 模块解释类似node。现在当前项目找，再去node_modules。因此通过别名或手动指定减少查找层级。第三方包（react，react-dom等等）都在node_modules，没必要进行路径分析。

5、优化resolve.mainFields配置，查找入口文件，会根据package.json去查找。直接去查找main字断减少不必要的分析过程。package.json没有main。会先找根目录下的index

```
resolve: {
  extensions: ['.js', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, '../src/'),
    'react': path.resolve(__dirname, '../node_modules/react/cjs/react.production.min.js'),
    'react-dom': path.resolve(__dirname, '../node_modules/react-dom/cjs/react-dom.production.min.js')
  },
  modules: [path.resolve(__dirname, '../node_modules')],
  mainFields: ['main']
}
```

6、优化 react 的引入方式(该方式会采用cdn的方式引入react，第三方cdn存在不可控因素，酌情使用)

```
// webpack.config.js

externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

// public/index.html 的 head 内增加

<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

```

#### 树摇优化 tree shaking

- tree shaking 会把用到的方法打到bundle。没用的方法会在uglify阶段擦除

- webpack mode 的 production 默认开启

**无用的css擦除**

- purgecss-webpack-plugin 和 mini-css-extract-plugin 和 glob 配合使用

```
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')

const PATHS = {
  src: path.join(__dirname, '../src')
}

plugins: [
     new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
]
```

**注意：该插件会把标签选择器样式排除例如`body {color: red}`，需要手动配置排除项目**更多细节参考官方文档

#### 图片压缩

image-webpack-loader 配合 file-loader

```
{
  test: /\.(png|svg|jpg|git)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        limit: 10240,
        name: path.join('img/[name][hash:8].[ext]')
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        // 只在 production 启用
        disable: process.env.NODE_ENV === 'production' ? false : true
      }
    },
  ]
}
```

#### 多进程/多实例构建，资源并行解析方案，提升构建速度

- HappyPack（webpack3常用，作者维护的越来越少了）

- parallel-webpack

- thread-loader （webpack官方）

```
{
  test: /\.jsx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: {}
    },
    {
      loader: 'thread-loader',
      options: {
        workers: 2,
      }
    }
  ],
  include: path.join(__dirname, '../src')
},
```

### 多进程/多实例并行压缩,提升打包构建速度

- parallel-uglify-plugin

- uglilys-webpack-plugin（不支持es6）

- terser-webpack-plugin(支持es6压缩,推荐)


### 分包，预编译资源模块 externals

- html-webpack-externals-plugin

- DLLPlugin

- webpack 的 externals 字断

**DllPlugin**

1、 创建webpack.dll.js

```
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name]_[chunkhash].dll.js',
        path: path.join(__dirname, '../library'),
        library: '[name]'
    },
    mode: 'production',
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, '../library/[name].json')
        })
    ]
};

```
2、执行构建 `webpack --config build/webpack.dll.js`

3、在webpack.pro.js中plugin 引入

```
// 通过 DllReferencePlugin 对 mainfest.json引用，引入
new webpack.DllReferencePlugin({
  manifest: require('../library/library.json')
})
```

**注意这里需要先执行webpack --config build/webpack.dll.js，构建出预编译资源模块，之后在打包webpack生产**

#### 二次构建 缓存

- babel-loader 缓存开启

- terser-webpack-plugin 缓存

- 使用cache-loader 或 hard-source-webpack-plugin 二次构建速度提升极大

```
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
plugins: [
  new FriendlyErrorsWebpackPlugin(),
]
```

#### noParse

不去解析某个库，比如（jquyer、lodash）等，这些三方库里面没有其他依赖，可以通过配置noParse不去解析文件，提高打包效率

```
module.exports = {
  module: {
    noParse: '/jquery|lodash/',
    rules:[]
  }
}
```

















3、 dev 环境开启 sourcemap 功能，方便调试。

```
devtool: 'source-map'
```

4、css 变量全局引入

```
//

```

#### 九、 webpack 的优化。针对生产环境。

**9.1 webpack 文件指纹**

1. hash： 整个项目的构建相关，只要项目文件有修改，整个项目构建 hash 就会改变。
2. chunkhash： 不同 entry 会生成不同的 chunkhash 值。
3. contenthash： 文件内容不变，contenthash 不变。

**webpack 在启用热更新时只能使用 hash 模式，不能使用另外两种**

```
  // 输出文件js的指纹

  output: {
    filename: '[name]_[hash:8].js'
  }
```

**设置图片的指纹**

```
// webpack.config.js  设置图片指纹。设置字体同样。
  {
    test: /\.(png|svg|jpg|git)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240,
          // hash:7 ：图片的hash采用md5生成（默认32位），7代表取前七位。ext：资源后缀名称。
          name: path.join('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }

```

**9.2 css 拆分和设置 css 指纹**

- 拆分 css 安装依赖 `mini-css-extract-plugin`，该插件不支持热更新，是用于生产的插件配置。

- webpack.config.js 配置

**该插件和 style-loader 是互斥插件，style-loader 是将样式以 style 标签的形式插入 head。该插件恰好相反，将 css 拆成独立的 css 文件。所以要调整 css,less 等 loader，如下代码。**

```
const MiniCss = require('mini-css-extract-plugin')

// plugins配置
plugins: [
  new MiniCss({
    filename: '[name]_[contenthash:8]'
  })
]

// loader配置
{
  test: /\.css$/,
  use: [MiniCss.loader, 'css-loader']
},
{
  test: /\.styl$/,
  use: [MiniCss.loader, 'css-loader', 'stylus-loader']
}

```
Hash
和整个项目的构建相关，只要项目中的文件有修改，整个项目构建的hash值就会发生改变

Chunkhash
不同的entry会生成不同的chunkhash值

1、output中的filename增加chunkhash

Contenthash

根据文件内容来定义hash，文件内容不变，则contenthash不变;一般css会采用contenthash，js发生变化，不会导致css重新生成


css一般都会采用style-loader和css-loader，最终会通过style标签插入到页面上，不会生产css文件，所以需要使用MiniCssExtractPlugin插件


MiniCssExtractPlugin.loader跟style-loader的功能是互斥的，不能同时存在


**9.3 压缩 css, js 文件**

- css 压缩插件 `optimize-css-assets-webpack-plugin`, js 压缩插件`uglifyjs-webpack-plugin`

```
// 导入
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// plugins配置
plugins: [
  new UglifyJsPlugin(),
  new OptimizeCSSAssetsPlugin()
],
```

**1. uglifyjs-webpack-plugin 本身 webpack 是内置了，mode 为 production 时自动压缩，自己引入配置可以增加定制化功能**

**2. css 的压缩还有采用 optimize-css-assets-webpack-plugin + cssnano 的配置方式，喜欢的可以去看看。**

**9.4 html 的压缩**

上面我们在最开始用到插件`html-webpack-plugin`来处理 index.html，该插件还可以配置压缩 html，只需要简单配置即可。

```
// 完整的配置
plugins: [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'public/index.html',
    inject: true,
    minify: {
      minifyCSS: true,
      minifyJS: true,
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeComments: true
    }
  })
]
```

**9.5 构建产物的自动清理，hash 的设置，会导致 dist 内打包的东西越来越多，需要先清理**

- 安装插件 `clean-webpack-plugin`,插件会自动针对 webpack 的 output 进行清理。

```
// 这个导入方式必须解构
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

plugins: [
  new CleanWebpackPlugin()
]
```

#### 十、tree shaking 优化代码， 一些饮用了但是没有实际使用的变量等不被打包进去。

webpack4 mode 模式设置为 production 即可。

#### 十一、scope hoisting 代码必须是 es6 ，如果是 cjs 则不行。

webpack 4 mode 模式设置为 production 即可。

或

```
const webpack = require('webpack')
plugins: [
  new webpack.optimize.ModuleConcatenationPlugin()
]
```

webpack 3 使用

```
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
module.exports = {
  plugins: [
    new ModuleConcatenationPlugin(),
  ],
};
```

#### 十二、提取公共页面资源

#### 十三、react (不是 ts)代码分割动态加载

1、安装依赖`@babel/plugin-syntax-dynamic-import`

2、在 babel 的配置里导入相应插件。

```
  plugins: ['@babel/plugin-syntax-dynamic-import']
```

3、使用， 使用动态后，打包会生产单独的 js 文件。

```
import('../dynamic').then(res => {
  this.setState({
    Text: res.default
  })
})
```

#### 一些特别的，有趣的问题。

1、 webpack 的 alias 设置 + tsconfig.json 的配置，导致 vscode 对于通过别名的方式引入的模块提示 can't find。

[tsconfig 的配置](http://www.typescriptlang.org/docs/handbook/compiler-options.html)

报错代码`import Gallery from '@/pages/gallery/index'`

**解决**

```
// 假如webpack.config.js配置如下
alias: {
  '@': path.resolve(__dirname, '../src/')
}

// tsconfig.json 需要做如下配置才能避免提示，/* 不可以少。
"paths": {
  "@/*": ["./src/*"]
}

```

#### 尾声，可以了解，但是该文档里没做的事情。

1、css 内联，html 内联，js 内联，通过内联减少 http 请求，进而提升性能。

css 内联需要安装`style-loader 和 html-inline-css-webpack-plugin`


<!-- =========== -->
解决 airbnb配置 eslint不识别webpack的路径别名

`eslint-import-resolver-webpack`

```
// eslintrc.js

settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.config.js'
      }
    }
  },
```

<!-- ====== -->
@babel/preset-react jsx语法糖的支持。始终包含以下插件：

```
@ babel / plugin-syntax-jsx
@ babel / plugin-transform-react-jsx
@ babel / plugin-transform-react-display-name
```

<!-- ====== -->
@babel/preset-env

@babel/preset-env是一个智能的babel预设, 让你能使用最新的JavaScript语法, 它会帮你转换成代码的目标运行环境支持的语法,

<!-- ===== -->
@babel/plugin-proposal-class-properties类属性提案，如果使用尖头函数需要使用该插件

```

class Main extends PureComponent {
  // 尖头
  dd = () => {}
  render() {
    return (
      <div>333</div>
    )
  }
}

```

<!-- ==================== -->
// 1. 不会刷新浏览器
$ webpack-dev-server
//2. 刷新浏览器
$ webpack-dev-server --inline
//3. 重新加载改变的部分，不会刷新页面
$ webpack-dev-server --hot
//4. 重新加载改变的部分，HRM失败则刷新页面
$ webpack-dev-server  --inline --hot

[dev-server全套配置](https://webpack.docschina.org/configuration/dev-server/#devserver)

webpack-dev-middleware详解

为什么要使用 webpack-dev-middleware

webpack 的 watch mode 虽然能监听文件的变更，并且自动打包，但是每次打包后的结果将会存储到本地硬盘中，而 IO 操作是非常耗资源时间的，无法满足本地开发调试需求。

而 webpack-dev-middleware 拥有以下几点特性：

以 watch mode 启动 webpack，监听的资源一旦发生变更，便会自动编译，生产最新的 bundle
在编译期间，停止提供旧版的 bundle 并且将请求延迟到最新的编译结果完成之后
webpack 编译后的资源会存储在内存中，当用户请求资源时，直接于内存中查找对应资源，减少去硬盘中查找的 IO 操作耗时


### postcss-preset-env
postcss-preset-env允许开发者使用最新的CSS语法而不用担心浏览器兼容性
#### webpack 的stats

<!--  -->
ajax 和 axios 和 fetch

#### browserslist 是在不同的前端工具之间共用目标浏览器和 node 版本的配置工具。它主要被以下工具使用：

Autoprefixer
Babel
post-preset-env
eslint-plugin-compat
stylelint-unsupported-browser-features
postcss-normalize

browserslist示例 演示了上面列举的每个工具是如何使用 browserslist 的。所有的工具将自动的查找当前工程规划的目标浏览器范围，前提是你在前端工程的 package.json 里面增加如下配置：

```
{
  "browserslist": [
    "last 1 version",
    "> 1%",
    "maintained node versions",
    "not dead"
  ]
}
```

复制代码或者在工程的根目录下存在.browerslistrc配置文件（内容如下）：

```
# 注释
last 1 version
> 1%
maintained node versions
not dead
```

查询来源
browerslist 将使用如下配置文件限定的的浏览器和 node 版本范围：

工具 options，例如 Autoprefixer 工具配置中的 browsers 属性。
BROWERSLIST 环境变量。
当前目录或者上级目录的browserslist配置文件。
当前目录或者上级目录的browserslistrc配置文件。
当前目录或者上级目录的package.json配置文件里面的browserslist配置项（推荐）。
如果上述的配置文件缺失或者其他因素导致未能生成有效的配置，browserslist 将使用默认配置> 0.5%, last 2 versions, Firefox ESR, not dead。


### speed-measure-webpack-plugin

使用：

```
const SpeedMeasure = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasure()
const webpackConfig = {
  entry: 'index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../dist')
  },
}
module.exports = smp.wrap(webpackConfig)
```

分析loader 和插件的执行时间

#### webpack-bundle-analyzer 分析bundle体积大小

使用：
```
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
plugins: [
    new WebpackBundleAnalyzer(),
  ]
```
