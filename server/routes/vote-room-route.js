const router = require('express').Router()
const { rooms } = require('./mock/vote-room-mock')

router.post('/rooms', (req, res) => {
  res.send({
    result: {
      rooms,
    },
  })
})

router.post('/vote', (req, res) => {
  res.send({
    result: true,
  })
})

module.exports = router
