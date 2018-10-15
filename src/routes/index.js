const Router = require('koa-router')
const V1 = require('./v1')
const V2 = require('./v2')

const router = new Router()
router.get('/', (ctx, next) => {
  ctx.res.ok({
    message: 'hello word'
  })
})

router.use('/v1/api', V1.routes(), V1.allowedMethods())
router.use('/v2/api', V2.routes(), V2.allowedMethods())

module.exports = router
