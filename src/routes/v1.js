const router = require('koa-router')()
const OauthController = require('../controller/oauth')

router.post('/open/signin', OauthController.signin)
router.get('/user/info', OauthController.verify)

module.exports = router
