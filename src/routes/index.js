const Router = require('koa-router')
const V1 = require('./v1')

const router = new Router()

router.get('/test', (ctx, next) => {
  throw new Error('test error~')
  ctx.body = 'hello'
})

router.use('/api/v1', V1.routes(), V1.allowedMethods())

module.exports = router