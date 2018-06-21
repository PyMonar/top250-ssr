const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const resolve = file => path.resolve(__dirname, file)

const bundle = require('./dist/vue-ssr-bundle.json')
const template = fs.readFileSync(resolve('./dist/index.html'), 'utf-8')

function createRenderer (bundle, template) {
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    template
  })
}

const renderer = createRenderer(bundle, template)

// 设置代理
const proxy = require('http-proxy-middleware')
const options = {
  target: 'https://api.douban.com/v2',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}
app.use('/api', proxy(options))
app.use('/dist', express.static('./dist'))

app.get('*', (req, res) => {
  const context = { url: req.url }
  renderer.renderToString(context, (err, html) => {
    console.log('html:', html)
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
      res.end(html)
    }
  })
})

app.listen(3000)
