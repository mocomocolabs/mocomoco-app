const router = require('express').Router()

const { feeds, feed } = require('./mock/feed-mock')

router.get('/feeds', (req, res) => {
  res.send(feeds)
})

router.get('/feeds/:id', (req, res) => {
  res.send(feed)
})

router.put('/feeds/:id', (req, res) => {
  res.send({ success: true })
})

router.delete('/feeds/:id', (req, res) => {
  res.send({ success: true })
})

router.post('/feeds/:id/comment', (req, res) => {
  res.send({ success: true })
})

router.put('/feeds/:id/comment/:commentId', (req, res) => {
  res.send({ success: true })
})

router.delete('/feeds/:id/comment/:commentId', (req, res) => {
  res.send({ success: true })
})

module.exports = router
