const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  chainWebpack (config) {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    proxy: {
      '/goods': {
        target: 'http://localhost:3000'
      }
    }
  }
}
