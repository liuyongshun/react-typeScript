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

- 安装 eslint 和 ts 相关插件 `eslint @typescript-eslint/parser`, 另外还需插件`@typescript-eslint/eslint-plugin`包含了各类定义好的检测 Typescript 代码的规范。

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

- vs code 安装 eslint 插件和 prettier-code 插件。设置如下配置。preferences —— setting。

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
