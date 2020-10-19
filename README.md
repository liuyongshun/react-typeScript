<!-- @format -->

### react + typescript 项目搭建

#### 一、基础结构搭建

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

#### 二、webpack 配置

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

**此时的配置代码：**

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

**此时目录结构：**

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

#### 三、react + react-router + es6 搭建

1、安装 react 相关工具`react`和`react-dom`

2、安装 es6 工具 `@babel/core @babel/preset-env babel-loader`,对于 react 需要安装`@babel/preset-react`

3、配置 babel.config.js

```
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: []
}
```

4、配置 webpack.config.js

```
 module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: path.join(__dirname, '../src')
    }]
  }
```

5、配置最简单的页面内容。

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

#### 四、配置 webpack 的一些优化项目

1、 配置别名和拓展名自动补充，规范同时方便 import 导入。

```
// webpack.config.js

resolve: {
  extensions: ['.js', '.json', '.styl'],
  alias: {
    '@': path.resolve(__dirname, '../src/')
  }
}
```

2、优化 react 的引入方式

```
// webpack.config.js

externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

// public/index.html

head内增加

<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

```

3、 dev 环境开启 sourcemap 功能，方便调试。

```
devtool: 'source-map'
```

4、css 变量全局引入

```
//

```

#### 五、配置样式，less 或 sass 或 stylus。

1、安装依赖 `css-loader` 加载.css 文件，并转换成 commonjs 对象。安装`style-loader`，将样式通过 style 标签插入 head 标签内。

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

- 这里有个要注意的点，样式加载器的顺序，先 style-loader 在 css-loader。

**知识：**

- webpack 的 loader 采用了函数的 compose（组合）方式，而不是 pipe（管道），compose 方式的执行顺序是从右到左，pipe 的执行顺序是从做到右。

3、在 src 下新建 style 文件，然后里面新建 common.css。并且导入到 pages/index.js 页面。

```
// src/pages/index.js

import '../style/common.css'

```

4、假如使用 less，只需要安装`less-loader`,在 webpack.config.js 的配置中的加入下面的配置。

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

5、假如使用 sass，需要安装`sass-loader node-sass`，在 webpack.config.js 中配置如下。

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

6、假如使用 stylus，需要安装`stylus-loader stylus`，在 webpack.config.js 中配置如下。

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

less-loader 依赖于 less，有时候出现 peerDependencies WARNING less-loader@\* requires a peer of less@^2.3.1 || ^3.0.0 but none was installed，自己手动安装一下 less 即可。反正记住：遇到 peerDependencies WARNING，什么依赖未能安装时，记得手动安装即可。或者用 yarn 更稳妥。

#### 六、配置图片，字体文件资源加载

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

#### 七、安装 type-script 配置

1、 安装 react 声明文件 `@types/react @types/react-dom`

2、安装 typescript 依赖`typescript`

3、新建 tsconfig.json

[更多配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

```
// tsconfig.json

{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```

4、配置 webpack.config.js

```
// 1. extensions增加.ts 和 .tsx
resolve: {
  extensions: ['.ts', '.tsx', '.js', '.json', '.styl'],
  alias: {
    '@': path.resolve(__dirname, '../src/')
  }
},

// 2. webpack.config.js 的rules里配置。

  {
    test: /\.(j|t)sx?$/,
    use: ['babel-loader']
  }

// 3. webpack.config.js的entry的index.js改为index.tsx
```

5、 将文件拓展名从`.js`改成`.tsx`。

#### 八、配置 eslint 规范代码

[ts 使用 eslint](https://eslint.org/blog/2019/01/future-typescript-eslint#linting)

[TypeScript ESLint 相关信息](https://github.com/typescript-eslint/typescript-eslint)

**typescript-eslint-parser 不在维护用@typescript-eslint/parser 代替，可查看上面第一个链接。**

- 安装 eslint 和 ts 相关插件 `eslint eslint-loader @typescript-eslint/parser`, 另外还需插件`@typescript-eslint/eslint-plugin`包含了各类定义好的检测 Typescript 代码的规范。

- 因为同时是 react 项目，还需要安装 `eslint-plugin-react`

- 配置`.eslintrc.js`文件

```
module.exports = {

    parser:  '@typescript-eslint/parser', //定义ESLint的解析器
    extends: [
    'plugin:react/recommended'
    'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['@typescript-eslint'], //定义ESLint的解析器
    env:{
        browser: true,
        node: true,
    },
    settings: {             //自动发现React的版本，从而进行规范react代码
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },
    parserOptions: {        //指定ESLint可以解析JSX语法
        "ecmaVersion": 2019,
        "sourceType": 'module',
        "ecmaFeatures":{
            jsx:true
        }
    }
    rules: {

    }
}

```

- 配置 webpack.config.js

```
// 配置webpack.config.js

{
  test: /\.js$/,
  use: ['babel-loader', 'eslint-loader'],
  include: path.join(__dirname, '../src')
},
{
  test: /\.(j|t)sx?$/,
  use: ['babel-loader', 'eslint-loader']
},
```

- 为了方便使用采用 Prettier 和 eslint 结合来格式化代码，安装依赖 `prettier eslint-config-prettier eslint-plugin-prettier`

1. prettier：prettier 插件的核心代码
2. eslint-config-prettier：解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效
3. eslint-plugin-prettier：将 prettier 作为 ESLint 规范来使用

- 创建.prettierrc.js 文件

```
module.exports = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: true,
  arrowParens: 'avoid',
  insertPragma: true,
  tabWidth: 2,
  useTabs: false,
}

```

- 修改`.eslintrc.js` 文件，搭配 prettier 使用。

[prettier 和 ts 使用](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)

```
// 更改掉extents即可。
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended']
```

1. prettier/@typescript-eslint：使得@typescript-eslint 中的样式规范失效，遵循 prettier 中的样式规范
2. plugin:prettier/recommended：使用 prettier 中的样式规范，且如果使得 ESLint 会检测 prettier 的格式问题，同样将格式问题以 error 的形式抛出

**到这里，基本上完成 eslint 和 prettier 的配置了，然后接下来有两个选择，1. 配合 husky 和 lint-staged 在 git 提交时自动格式化代码。2.开发时配合 vscode 保存自动格式化代码。**

**方式 1:**

1、 安装依赖，`husky lint-staged`。

2、 配置 package.json

```
// script 增加
 "scripts": {
   "lint": "eslint src --fix --ext .ts,.tsx"
}

// scripts同级
 "husky": {
   "hooks": {
      "pre-commit": "npm run lint"
    }
},
```

**方式 2:**

- vs code 安装 eslint 插件和 prettier-code 插件。设置如下配置。preferences —— setting —— 点击右上角的图标打开 json 文件。

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
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        },
        "typescriptreact"
    ],
    "eslint.options": {
        "extensions": [
            ".js",
            ".vue",
            ".tsx"
        ]
    },
```

**到这里基本的配置，规范什么的算是配置完成了，然后接下来就是一些高级一点的配置。例如 webpack 的优化。typescript 的装饰器，router 的懒加载等等。**

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

### 多进程/多实例构建，资源并行解析方案

HappyPack（webpack3常用，作者维护的越来越少了） 或 parallel-webpack 或 thread-loader （webpack官方）

### 多进程/多实例并行压缩

parallel-uglify-plugin 和 uglilys-webpack-plugin（不支持es6） 和 terser-webpack-plugin(支持es6压缩,推荐)
提升打包构建速度

### 分包，预编译资源模块 externals

html-webpack-externals-plugin 或 DLLPlugin 或 webpack的externals字断

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
}),
```

**webpack的externals字断**

防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)


#### 二次构建速度，缓存思路

babel-loader 缓存开启

terser-webpack-plugin 缓存

使用cache-loader或hard-source-webpack-plugin 二次构建速度提升极大

```
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
plugins: [
  new FriendlyErrorsWebpackPlugin(),
]
```

#### 缩小构建目标

- babel-loader 不要解析node_modules,配置排除文件

- 减少文件搜索范围，优化resolve.modules配置， 减少模块搜索层级

webpack 模块解释类似node。现在当前项目找，再去node_modules。因此通过手动指定减少查找层级。第三方包都在node_modules。没必要进行路径分析。

- 优化resolve.mainFields配置

查找入口文件，会根据package.json去查找。直接去查找main字断减少不必要的分析过程。package.json没有main。会先找根目录下的index

- 优化resolve.extensions配置

配置拓展，自动不全拓展名。减少文件的查找类型范围。

```
resolve: {
  alias: {
    react: path.resolve(__dirname, './node_modules/react/dist/react.min.js')
  },
  modules: [path.resolve(__dirname, 'node_modules')],
  mainFields: ['main']
}
```
