const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')

const devConfig = {
  mode: 'development',
  plugins: [],
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
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
