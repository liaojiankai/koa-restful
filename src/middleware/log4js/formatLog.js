const log4js = require('log4js')
const log4jsConfig = require('./config.js')
log4js.configure(log4jsConfig)
const resLogger = log4js.getLogger('response')

const getClientIp = function (req) {
  resLogger.info(`req.headers['x-forwarded-for']`, req.headers['x-forwarded-for'])

  resLogger.info(`req.connection`, req.connection)
  resLogger.info(`req.socket`, req.socket.remoteAddress)


  return req.headers['x-forwarded-for'] ||
    req.connection ||
    req.socket.remoteAddress ||
    req.connection.socket || '';
}

const formatError = (ctx, err, costTime) => {
  const {
    method,
    url,
    request: {
      body
    },
    header: {
      userAgent
    }
  } = ctx

  const ip = getClientIp(ctx)
  return {
    method,
    url,
    body,
    costTime,
    err,
    userAgent,
    ip
  }
}

const formatRes = (ctx, costTime) => {
  const ip = getClientIp(ctx)
  const {
    method,
    url,
    body,
    response,
    headers
  } = ctx
  const request = {
    method,
    url,
    body,
    headers,
  }

  return {
    request,
    costTime,
    response,
    ip
  }
}
module.exports = {
  formatError,
  formatRes
}