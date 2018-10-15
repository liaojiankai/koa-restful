const router = require('koa-router')()
const IndexController = require('../controller/index')

 router
    .get('/index', IndexController.index)

module.exports = router