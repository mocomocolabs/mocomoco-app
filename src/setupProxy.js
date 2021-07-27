const { createProxyMiddleware } = require('http-proxy-middleware')

const socketProxy = createProxyMiddleware(['/api', '/ws-chat'], {
  target: 'http://13.209.84.58',
  changeOrigin: true,
  ws: true,
})

module.exports = (app) => {
  app.use(socketProxy)
}
