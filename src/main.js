const Koa = require('koa')
const app = new Koa()

const router = require('./routes')
const middleware = require('./middleware')
const mongoose = require('./schemas/connection')

middleware(app)
app.use(router.routes()).use(router.allowedMethods())
mongoose.connection()

module.exports = app
