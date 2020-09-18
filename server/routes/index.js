const vote = require('./vote-route')
const vote_room = require('./vote-room-route')
module.exports = function(app) {
  app.use('/api', vote)
  app.use('/api', vote_room)
}
