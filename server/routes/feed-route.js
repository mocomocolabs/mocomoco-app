const router = require('express').Router()

const { feeds, feed } = require('./mock/feed-mock')

router.get('/feeds', (req, res) => {
  res.send(feeds)
})

router.get('/feeds/:id', (req, res) => {
  res.send(feed)
})

module.exports = router
