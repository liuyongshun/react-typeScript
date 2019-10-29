const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// console.log(__dirname, '33333', path.join(__dirname), 'fffkffffkfkfk')
// console.log(path.resolve(__dirname, '../src/api'), 'kkkkkkkkkkkkkkkkkkkkkk')
module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
         '@': path.resolve(__dirname, '../src'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@router': path.resolve(__dirname, '../router')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/, // 正则匹配文件路径
        exclude: /node_modules/,
        use: [
          // 注意loader生效是从下往上的
          'style-loader',
          'css-loader'
        ]
     }

      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   loader: 'source-map-loader'
      // },
      // {
      //   test: /\.(j|t)sx?$/,
      //   use: ['babel-loader'],
      //   include: [path.resolve('../src')],
      //   // 排除node_modules底下的
      //   exclude: /node_modules/
      // }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8077,
    historyApiFallback: true,
    overlay: {
      //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true
    },
    inline: true,
    hot: true
  }
}
