const community = require('./community-route')
const feed = require('./feed-route')
const comment = require('./comment-route')

module.exports = function (app) {
  app.use('/api', feed)
  app.use('/api', comment)
  app.use('/api', community)
}
