const express = require('express')
const webpack = require('webpack')
const chalk = require('chalk')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  logTime: true,
  stats: 'errors-warnings'
}))

const getIPAddress = () => {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i=0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

const LOCAL_IP = getIPAddress()

app.listen(8899, () => {
  console.log(chalk.yellow('http://localhost:8899'))
  console.log(chalk.blue(`http://${LOCAL_IP}:8899`))
})
