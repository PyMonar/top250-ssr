const express = require('express')
const app = express()
const renderer = require('vue-server-renderer').createRenderer()
const proxy = require('http-proxy-middleware')

const options = {
  target: 'http://api.douban.com/v2', // target host
  changeOrigin: true,               // needed for virtual hosted sites
  pathRewrite: {
    '^/api': ''
  }
}

app.use('/api', proxy(options))

const createApp = require('../dist/server-bundle.js').default

app.get('*', (req, res) => {
  const context = { url: req.url }
  console.log(context)
  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      console.log('html:', html)
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
        res.end(html)
      }
    })
  }).catch(err => {
    res.status(404).end('Page not found')
  })
})

app.listen(3000)
