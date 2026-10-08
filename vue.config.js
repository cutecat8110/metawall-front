// Use the webpack instance supplied by the existing Vue CLI build toolchain.
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })]
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/helpers/_variables.scss";'
      }
    }
  },

  outputDir: 'docs',

  publicPath: '/metawall-front/'
})
