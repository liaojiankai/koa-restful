const mongose = require('mongoose')
const Schema = mongose.Schema

const token = new Schema({
  count: { type: Array },
  trade: { type: Array }
})

module.exports = mongose.model('token', token, 'token' )
