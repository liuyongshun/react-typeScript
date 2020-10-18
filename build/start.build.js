const webpack = require('webpack')
const config = require('./webpack.pro.js')('production')
webpack(config, (err, stats) => {
  console.log(stats)
})
