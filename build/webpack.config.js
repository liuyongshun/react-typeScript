/** @format */
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, '../src/index.jsx'),
  output: {
    filename: '[name]_[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
          // {
          //   loader: ['babel-loader', 'eslint-loader'],
          //   // options: {
          //   //   presets: ['@babel/preset-react', '@babel/preset-env']
          //   // }
          // }
        // ],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader'
      // },

      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'less-loader'
      //   ]
      // },
      // {
      //   test: /\.styl$/,
      //   use: ['style-loader', 'css-loader', 'stylus-loader']
      // },
      {
        test: /\.(png|svg|jpg|git)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: path.join('img/[name][hash:7].[ext]')
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
              limit: 10240,
              name: path.join('img/[name][hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: 8099,
    compress: true,     // 为每个静态文件开启gzip
    quiet: true,        // 不打印编译信息
    historyApiFallback: true,
    overlay: {          // 出现编译器错误或警告时，在浏览器中显示全屏覆盖，搭配eslint-loader.做语法校验
      warnings: true,
      errors: true
    }
  }
}
