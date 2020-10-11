const faker = require('faker/locale/ko')
const _ = require('lodash')
faker.seed(Date.now())

const names = ['준호', '규온', '쏘울', '이자', '상자']
const titles = [
  '',
  '',
  '아 현기증 나ㅏㅏㅏ!!',
  '우리집에서 코딩할 사람',
  '순창살이에 도전하였습니다!',
  '희망과 절망은 환상이지',
  '이럴때는 소주를 먹어줘야지',
  '개발도상국 치킨 뚝딱!',
]
const contents = [
  `소심한 소년의 기타 소리가 들리십니까? 그저 귀여운 츠보미 였는걸...`,
  `희망이나 절망은 환상이니까,
  매일매일 묵묵하게 보이는 만큼
  
  어둠속에 있다고 해서 호들갑 떨면 더 눈앞이 깜깜해지니까
  
  눈을 예리하고 자세히 뜨고
  보이는 만큼 한발한발`,
  `📚 유발하라리의 “사피엔스" 책 읽기 3번째 모임!
  총 6분이 참여해주셨고, 사당역 행복공장에서 진행되었습니다. 이자님이 홈베이킹을 해오셔서, 민트차와 함께 잘 먹었습니다. 너무 맛있었어요!농업혁명이 우리 삶의 질을 더 안좋게 했다니... 기존의 통념을 깨는 글귀들이 많았어요. 당연하다고 생각했던 것들을 돌아볼 수 있는 시간이었습니다.다들 다음 시간에 또 만나요~`,
  '아 현기증 나ㅏㅏㅏ!!',
  '우리집에서 코딩할 사람',
  '순창살이에 도전하였습니다!',
  '희망과 절망은 환상이지',
  '이럴때는 소주를 먹어줘야지',
  '개발도상국 치킨 뚝딱!',
]
const profileUrls = [
  '/assets/mock/profile1.jpeg',
  '/assets/mock/profile2.jpeg',
  '/assets/mock/profile3.jpeg',
  '/assets/mock/profile4.jpeg',
  '/assets/mock/profile5.jpeg',
  '/assets/mock/profile6.jpeg',
  '/assets/mock/profile7.jpeg',
  '/assets/mock/profile8.jpeg',
  '/assets/mock/profile9.jpeg',
  '/assets/mock/profile10.jpeg',
  '/assets/mock/profile11.jpeg',
  '/assets/mock/profile12.jpeg',
  '/assets/mock/profile13.jpeg',
]
const contentImgUrls = [
  '/assets/mock/content1.jpeg',
  '/assets/mock/content2.jpeg',
  '/assets/mock/content3.jpeg',
  '/assets/mock/content4.jpeg',
  '/assets/mock/content5.jpeg',
]

const createdAts = ['3일전', '2일전', '어제', '16시간 전', '2시간전', '방금']

const createComments = (count) =>
  _.times(count, (num) => ({
    id: num,
    user: {
      id: num,
      nickname: names[faker.random.number(names.length - 1)],
      profileUrl: profileUrls[faker.random.number(profileUrls.length)],
    },
    content: titles[faker.random.number(titles.length - 1)],
    createdAt: createdAts[faker.random.number(createdAts.length - 1)],
  }))

const createFeeds = (count) =>
  _.times(count, (num) => ({
    id: num,
    type: ['SCHEDULE', 'NORMAL'][num % 2],
    user: {
      id: num,
      nickname: names[faker.random.number(names.length - 1)],
      profileUrl: profileUrls[faker.random.number(profileUrls.length - 1)],
    },
    title: titles[num % contents.length],
    content: contents[num % contents.length],
    scheduleDate: ['2020-12-18 18:00', ''][num % 2],
    scheduleTitle: '준호네집 집들이겸 파자마 파티 합니다!',
    imageUrls: contentImgUrls,
    commentCount: faker.random.number(50),
    likeCount: faker.random.number(20),
    likeProflieUrls: profileUrls,
    comments: createComments(faker.random.number(20)),
    createdAt: createdAts[num % createdAts.length],
    isPublic: count % 2 ? true : false,
  }))

module.exports = {
  feeds: createFeeds(20),
  feed: createFeeds(20)[faker.random.number(19)],
}
