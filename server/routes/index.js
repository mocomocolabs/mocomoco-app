const community = require('./community-route')
const feed = require('./feed-route')

module.exports = function (app) {
  app.use('/api', feed)
  app.use('/api', community)
}
