const router = require('express').Router()

router.get('/communities', (req, res) => {
  res.send([
    {
      id: 1,
      name: '진강산마을 교육 공동체',
      count: 20,
      bannerUrl: '/assets/mock/content1.jpeg',
    },
    {
      id: 2,
      name: '우리동네 사람들',
      count: 56,
      bannerUrl: '/assets/mock/content2.jpeg',
    },
    {
      id: 3,
      name: '전국학원 셔틀버스 네트워크',
      count: 152,
      bannerUrl: '/assets/mock/content3.jpeg',
    },
    {
      id: 4,
      name: '오늘 공동체',
      count: 22,
      bannerUrl: '/assets/mock/content4.jpeg',
    },
    {
      id: 5,
      name: '생태마을',
      count: 55,
      bannerUrl: '/assets/mock/content5.jpeg',
    },
  ])
})

module.exports = router
