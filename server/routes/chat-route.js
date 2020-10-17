const router = require('express').Router()

const { chatRooms, chatMessages } = require('./mock/chat-mock')

router.get('/chats/rooms', (req, res) => {
  res.send(chatRooms)
})

router.get('/chats/rooms/:id', (req, res) => {
  res.send(chatMessages)
})

router.post('/chats/rooms/:id', (req, res) => {
  res.send({ success: true })
})

router.delete('/chats/rooms/:id', (req, res) => {
  res.send({ success: true })
})

module.exports = router
