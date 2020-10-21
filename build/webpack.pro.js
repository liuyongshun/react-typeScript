const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
// const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const SpeedMeasure = require('speed-measure-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const smp = new SpeedMeasure()

const PATHS = {
  src: path.join(__dirname, '../src')
}

const config = {
  entry: path.join(__dirname, '../src/index.jsx'),
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.join(__dirname, '../dist')
  },
  mode: 'none',
  stats: 'normal',
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
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
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
      {
        test: /\.css$/,
        use: [MiniCss.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCss.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
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
              remPrecision: 8, // 小数点位数
            },
          },
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
          {
            loader: 'image-webpack-loader',
            options: {
              // 只在 production 启用
              disable: process.env.NODE_ENV === 'production' ? false : true
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
    // new UglifyJsPlugin({
    //   parallel: true
    // }),
    new webpack.DllReferencePlugin({
      manifest: require('../library/library.json')
    }),
    new HardSourceWebpackPlugin(),
    // new OptimizeCSSAssetsPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
    new CleanWebpackPlugin(),
    // new WebpackBundleAnalyzer(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          minChunks: 1,
          name: 'commons',
          enforce: true,
          minSize: 70000, // 限制最小大小 ( byte )
        },
      },
    },
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       parallel: 4,
  //     }),
  //   ],
  // },
}

module.exports = smp.wrap(config)
