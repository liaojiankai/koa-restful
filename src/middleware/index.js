const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const cors = require('./corsRequest')
const jwtKoa = require('koa-jwt')
const { secret, jwtKoaUnlessPath } = require('../config').token

const responseHandler = require('./responseHandler')

const isDev = process.env.NODE_ENV === 'development'

module.exports = app => {

  // error handler
  onerror(app)
  app.use(function (ctx, next) {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = err.originalError ? err.originalError.message : err.message
      } else {
        if(isDev) {
          ctx.status = 500
          ctx.body = err
        } else {
          ctx.status = 500
        }
      }
    });
  });
  app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
  }))

  app.use(cors())

  // 过滤不用jwt验证
  app.use(jwtKoa({ secret }).unless({
    // path: [...jwtKoaUnlessPath]
    path: [
      /^\/test/,
      /^\/open/,
      /^\api\/v1\/auth\/signin/,
    ]
  }))

  app.use(json())
  app.use(logger())

  // app.use(require('koa-static')(__dirname + '../public'))

  app.use(responseHandler())

  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

}
