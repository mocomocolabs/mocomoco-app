const router = require('express').Router()
const { users } = require('./mock/user-mock')

const getUserIdFrom = (params) => parseInt(params.id)

router.get('/users/current', (req, res) => {
  const userId = users.getCurrentUserId()
  res.send({ userId: userId })
})

router.get('/users/:id', (req, res) => {
  const userId = getUserIdFrom(req.params)
  const user = users.get(userId)
  res.send(user)
})

router.post('/users', (req, res) => {
  const result = users.insert(req.body)
  res.send({ success: result })
})

// not used
router.put('/users/:id', (req, res) => {
  const result = users.replace(getUserIdFrom(req.params), req.body)
  res.send({ success: result })
})

router.patch('/users/:id', (req, res) => {
  const result = users.update(getUserIdFrom(req.params), req.body)
  res.send({ success: result })
})

router.delete('/users/:id', (req, res) => {
  const result = users.delete(getUserIdFrom(req.params))
  res.send({ success: result })
})

module.exports = router
