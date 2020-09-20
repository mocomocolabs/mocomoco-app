const router = require('express').Router()

router.get('/communities', (req, res) => {
  res.send([
    { id: 1, name: '진강산마을 교육 공동체' },
    { id: 2, name: '우리동네 사람들' },
    { id: 3, name: '전국학원 셔틀버스 네트워크' },
    { id: 4, name: '오늘 공동체' },
    { id: 5, name: '생태마을' },
  ])
})

module.exports = router
