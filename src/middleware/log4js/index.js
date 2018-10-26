const path = require('path')
const log4js = require('log4js')
const log4jsConfig = require('./config.js')
const {
  formatError,
  formatRes
} = require('./formatLog')

//加载配置文件
log4js.configure(log4jsConfig)


let errorLogger = log4js.getLogger('error')
let resLogger = log4js.getLogger('response')
let cacheLogger = log4js.getLogger('cache')


module.exports = class Logger {

  static errLogger(ctx, error, resTime) {
    if (ctx && error) {
      errorLogger.error(formatError(ctx, error, resTime))
    }
  }

  static resLogger(ctx, resTime) {
    resLogger.info(formatRes(ctx, resTime))
  }

  static cacheLogger() {
    cacheLogger.error(formatRes(ctx, resTime))
  }
}