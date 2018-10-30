const log4js = require('log4js')
const log4jsConfig = require('./config.js')

const {
  formatError,
  formatRes
} = require('./formatLog')

//加载配置文件
log4js.configure(log4jsConfig)

const errorLogger = log4js.getLogger('error')
const resLogger = log4js.getLogger('response')
const badRequest = log4js.getLogger('badRequest')

exports.resLogger = log4js.getLogger('response')

module.exports = class Logger {

  static errLogger(ctx, error, resTime) {
    if (ctx && error) {
      errorLogger.warn(formatError(ctx, error, resTime))
    }
  }

  static resLogger(ctx, resTime) {
    resLogger.info(formatRes(ctx, resTime))
  }

  static badRequest(ctx, resTime) {
    badRequest.fatal(formatRes(ctx, resTime))
  }
}