const router = require('koa-router')()
const TokenController = require('../controller/token')

// Auth
router.get('/auth/verify', TokenController.verify)
router.post('/auth/signin', TokenController.signin)

module.exports = router
