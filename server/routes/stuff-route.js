const router = require('express').Router()

const { stuffs } = require('./mock/stuff-mock')

router.get('/stuffs', (req, res) => {
  res.send(stuffs)
})

router.get('/stuffs/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.send(stuffs.find((s) => id === s.id))
})

router.put('/stuffs/:id', (req, res) => {
  res.send({ success: true })
})

router.delete('/stuffs/:id', (req, res) => {
  res.send({ success: true })
})

module.exports = router
