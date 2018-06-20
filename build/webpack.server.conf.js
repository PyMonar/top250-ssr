const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    target: 'node',
    entry: {
      app: './src/entry-server.js'
    },
    output: {
      path: config.build.assetsRoot,
      filename: 'server-bundle.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    externals: Object.keys(require('../package.json').dependencies),
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        }
      ]
    }
}
