const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    proxy: {
      '/goods': {
        target: 'http://localhost:3000'
      },
      '/goods/*': {
        target: 'http://localhost:3000'
      },
      '/users/*': {
        target: 'http://localhost:3000'
      }
    }
  }
}
