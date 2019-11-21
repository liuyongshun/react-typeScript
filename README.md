### react + typescript 项目搭建

#### 基础结构搭建

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

#### webpack 配置

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

#### react + react-router + es6 搭建

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

#### 配置 webpack 的一些优化项目

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

#### 配置样式，less 或 sass 或 stylus。

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

#### 配置图片，字体文件资源加载

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

#### 安装 type-script 配置

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

#### 配置 eslint 规范代码
