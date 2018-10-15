const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const cors = require('koa2-cors')

const cors = require('./corsRequest')
const responseHandler = require('./responseHandler')

module.exports = app => {

  // error handler
  onerror(app)

  // middlewares
  // app.use(cors({
  //   origin: '*',
  //   exposeHeaders: [
  //     'Origin',
  //     'X-Requested-With',
  //     'Content-Type',
  //     'Accept',
  //     'Authorization',
  //     'a'
  //   ],
  //   maxAge: 5,
  //   redentials: true,
  //   allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  //   allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'a'],
  // }))
  app.use(cors())
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