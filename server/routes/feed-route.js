const router = require('express').Router()

const { feeds } = require('./mock/feed-mock')

router.get('/feeds', (req, res) => {
  res.send(feeds)
})

module.exports = router
