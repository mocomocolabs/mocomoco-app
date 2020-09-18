const faker = require('faker/locale/ko')
const _ = require('lodash')
faker.seed(5)

const createRooms = count =>
  _.times(count, num => ({
    voteRoomKey: faker.random.number(),
    voteRoomTitle: faker.random.words(),
    voteRoomStatus: faker.random.boolean(),
    isPrivateStatus: faker.random.boolean()
  }))

module.exports = {
  rooms: createRooms(20)
}
