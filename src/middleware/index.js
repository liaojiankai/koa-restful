const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const cors = require('./corsRequest')
const jwtKoa = require('koa-jwt')
const {
  secret,
  jwtKoaUnlessPath
} = require('../config').token

const responseHandler = require('./responseHandler')
const Log4js = require('./log4js')

const isDev = process.env.NODE_ENV === 'development'

module.exports = app => {

  // error handler
  onerror(app)

  app.use(async (ctx, next) => {
    const start = new Date()
    let ms
    await next().then(() => {
      ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
      Log4js.resLogger(ctx, ms)
      // 记录响应日志
    }).catch((err) => {
      ms = new Date() - start
      if (err.status) {
        ctx.body = err
        ctx.status = err.status
        // 记录响应日志
        Log4js.badRequest(ctx, ms)
      } else {
        ctx.status = 500
        ctx.body = err.originalError ? err.originalError.message : err.message || 'Server internal exception'
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
        //记录异常日志
        Log4js.errLogger(ctx, err, `${ms}ms`)
      }
    })
  })

  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))

  app.use(cors())

  // 过滤不用jwt验证
  app.use(jwtKoa({
    secret
  }).unless({
    // path: [...jwtKoaUnlessPath]
    path: [
      /^\/favicon.ico/,
      /^\/test/,
      /^\/open/,
      /^\api\/v1\/auth\/signin/,
    ]
  }))

  app.use(json())
  app.use(logger())

  // app.use(require('koa-static')(__dirname + '../public'))

  app.use(responseHandler())

  app.on('error', (err, ctx) => {
    console.log(err)
    logger.error('server error', err, ctx);
  })

}