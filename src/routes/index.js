const Router = require('koa-router')
const V1 = require('./v1')
const V2 = require('./v2')

const router = new Router()

router.get('/test', (ctx, next) => {
  ctx.body = 'hello'
})

router.use('/api/v1', V1.routes(), V1.allowedMethods())
router.use('/api/v2', V2.routes(), V2.allowedMethods())

module.exports = router
