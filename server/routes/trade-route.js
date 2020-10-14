const router = require('express').Router()

const tradeMocks = [
  { data: require('./mock/stuff-mock').stuffs, path: '/stuffs' },
  { data: require('./mock/talent-mock').talents, path: '/talents' },
]

tradeMocks.map((mock) => {
  router.get(mock.path, (req, res) => {
    const keyword = req.query.keyword

    const result =
      keyword && keyword.length > 0 ? mock.data.filter((item) => item.title.includes(keyword)) : mock.data

    res.send(result)
  })

  router.get(`${mock.path}/:id`, (req, res) => {
    const id = parseInt(req.params.id)
    res.send(mock.data.find((s) => id === s.id))
  })

  router.put(`${mock.path}/:id`, (req, res) => {
    res.send({ success: true })
  })

  router.delete(`${mock.path}/:id`, (req, res) => {
    const id = parseInt(req.params.id)
    mock.data.splice(
      mock.data.findIndex((s) => id === s.id),
      1
    )

    res.send({ success: true })
  })
})

module.exports = router
