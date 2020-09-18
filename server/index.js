const express = require('express')
const apis = require('./routes')
const PORT = 5050

const server = express()

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')

server.use(cors({ origin: true, credentials: true }))
server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cookieParser())

apis(server)

server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${PORT}`)
})
