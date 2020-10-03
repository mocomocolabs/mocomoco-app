const router = require('express').Router()

router.post('/comment', (req, res) => {
  res.send({ success: true })
})

router.put('/comment/:id', (req, res) => {
  res.send({ success: true })
})

router.delete('/comment/:id', (req, res) => {
  res.send({ success: true })
})

module.exports = router
