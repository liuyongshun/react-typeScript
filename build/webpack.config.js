const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: path.join(__dirname, '../src/index.jsx'),
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      'react': path.resolve(__dirname, '../node_modules/react/cjs/react.production.min.js'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom/cjs/react-dom.production.min.js')
    },
    modules: [path.resolve(__dirname, '../node_modules')],
    mainFields: ['main']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        include: path.join(__dirname, '../src'),
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
                patterns: [
                  path.join(__dirname, '../src/style/variable.less')
                ],
                injector: 'append'
            }
          }
        ],
      },
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
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: path.join('fonts/[name][hash:8].[ext]')
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
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: '../dist',
    // host: 'localhost',
    // port: 8099,
    // compress: true,     // 为每个静态文件开启gzip
    // quiet: true,        // 不打印编译信息
    // historyApiFallback: true,
    // overlay: {          // 出现编译器错误或警告时，在浏览器中显示全屏覆盖，搭配eslint-loader.做语法校验
    //   warnings: true,
    //   errors: true
    // }
  }
}
