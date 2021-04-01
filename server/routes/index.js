const community = require('./community-route')
const feed = require('./feed-route')
const comment = require('./comment-route')
const user = require('./user-route')
const stufftalent = require('./stufftalent-route')
const chat = require('./chat-route')

module.exports = function (app) {
  app.use('/api', feed)
  app.use('/api', comment)
  app.use('/api', community)
  app.use('/api', user)
  app.use('/api', stufftalent)
  app.use('/api', chat)
}
