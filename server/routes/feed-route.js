const router = require('express').Router()

const { feeds, feed } = require('./mock/feed-mock')

router.get('/feeds', (req, res) => {
  res.send(feeds)
})

router.post('/feeds', (req, res) => {
  res.send({ success: true })
})

router.get('/feeds/:id', (req, res) => {
  res.send(feed)
})

router.put('/feeds/:id', (req, res) => {
  res.send({ success: true })
})

router.delete('/feeds/:id', (req, res) => {
  const findIndex = feeds.findIndex(({id}) => id === parseInt(req.params.id))
  findIndex >= 0 && feeds.splice(findIndex, 1)
  res.send({ success: true })
})

module.exports = router
