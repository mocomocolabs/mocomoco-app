const router = require('express').Router()

const tradeMocks = [
  { data: require('./mock/stuff-mock').stuffs, path: '/stuffs' },
  { data: require('./mock/talent-mock').talents, path: '/talents' },
]

tradeMocks.map((mock) => {
  router.get(mock.path, (req, res) => {
    res.send(mock.data)
  })

  router.get(`${mock.path}/:id`, (req, res) => {
    const id = parseInt(req.params.id)
    res.send(mock.data.find((s) => id === s.id))
  })

  router.put(`${mock.path}/:id`, (req, res) => {
    res.send({ success: true })
  })

  router.delete(`${mock.path}/:id`, (req, res) => {
    res.send({ success: true })
  })
})

module.exports = router
