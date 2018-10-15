const mongose = require('mongoose')
const Schema = mongose.Schema

const user = new Schema({
  authorities: Array,
  mobile: Number,
})

module.exports = mongose.model('user', user, 'user' )
