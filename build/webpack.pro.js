/** @format */
const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: '[name]_[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  mode: 'none',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.css$/,
        use: [MiniCss.loader, 'css-loader']
      },
      {
        test: /\.(j|t)sx?$/,
        use: ['babel-loader']
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
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // {
      //   test: /\.styl$/,
      //   use: [MiniCss.loader, 'css-loader', 'stylus-loader']
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
      // minify: {
      //   minifyCSS: true,
      //   minifyJS: true,
      //   html5: true,
      //   collapseWhitespace: true,
      //   preserveLineBreaks: true,
      //   removeComments: true
      // }
    }),
    new MiniCss({
      filename: '[name]_[contenthash:8].css'
    }),
    new FriendlyErrorsWebpackPlugin(),
    // new UglifyJsPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
  // devServer: {
  //   host: 'localhost',
  //   port: 8099,
  //   historyApiFallback: true,
  //   overlay: {
  //     errors: true
  //   },
  //   inline: true,
  //   hot: true
  // }
}
