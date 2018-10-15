const mongose = require('mongoose')
const Schema = mongose.Schema

const exchange = new Schema({
  name: String
})

module.exports = mongose.model('exchange', exchange, 'exchange' )

