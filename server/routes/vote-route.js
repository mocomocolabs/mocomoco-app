const router = require('express').Router()
const { places } = require('./mock/vote-mock')

router.get('/places', (req, res) => {
  res.send({
    result: {
      places
    }
  })
})

router.post('/vote', (req, res) => {
  res.send({
    result: true
  })
})

module.exports = router
