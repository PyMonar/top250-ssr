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
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    },
    plugins: [
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server"'
        })
    ]
}
