/** @format */
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: '[name]_[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  devtool: 'source-map',
  resolve: {
<<<<<<< HEAD
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
=======
>>>>>>> 61191d896a23df0ca569ed8520bf3cf36b2dcf0b
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  module: {
    rules: [
      {
<<<<<<< HEAD
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: '../src/style/variable.scss'
          //   }
          // }
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.(j|t)sx?$/,
        use: ['babel-loader', 'eslint-loader']
=======
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
>>>>>>> 61191d896a23df0ca569ed8520bf3cf36b2dcf0b
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
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    inline: true,
    hot: true
  }
}
