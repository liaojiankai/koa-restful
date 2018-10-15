const mongose = require('mongoose')
const Schema = mongose.Schema

const strategy = new Schema({
  countToken: String,
  tradeToken: String,
  countExchange: String,
  trandeExchange: String,
  minAmount: Number,
  maxAmount: Number,
  minProfitA: String,
  minProfitB: String,
  userId: String,
  gmtCreated: Date,
  gmtModified: Date,
  isDelete: { type: Boolean, default: false},
  enable: {type: Boolean, default: true}
})

module.exports = mongose.model('strategy', exchange, 'strategy' )
