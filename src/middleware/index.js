const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const cors = require('./corsRequest')
const jwtKoa = require('koa-jwt')
const secret = require('../config').token

const responseHandler = require('./responseHandler')

module.exports = app => {

  // error handler
  onerror(app)

  app.use(cors())

  // 过滤不用jwt验证
  app.use(jwtKoa({ secret, debug: true }).unless({
    path: [
      /^\/api\/v1\/open/,
      /^\/test/,
      /^\/api\/v1\/user\/info/,
    ]
  }))

  app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
  }))
  app.use(json())
  app.use(logger())
  app.use(require('koa-static')(__dirname + '../public'))

  app.use(responseHandler())

  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

}
