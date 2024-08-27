const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Sports/'
    : '/',
  css: {
    extract: {
      filename: 'style.css',
      chunkFilename: 'style.css'
    }
  }
})