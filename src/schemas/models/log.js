const mongose = require('mongoose')
const Schema = mongose.Schema

const Log = new Schema({
  level: String,
  message: String,
  info: {
    method: String,
    url: String,
    costTime: Number,
    body: String,
    response: {
      status: String,
      message: String,
      header,
      body,
    }
  }
})

module.exports = mongose.model('log', Log, 'log')