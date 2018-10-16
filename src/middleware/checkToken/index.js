const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const { secret } = require('../../config').token

module.exports = () => async(ctx, next) => {
  try {
    const token = ctx.get('Authorization') // 获取jwt
    if(token) {
      let payload
      try {
        payload = await verify(token.split(' '[1]), secret)
        ctx.body = payload
      } catch (error) {
        error.status = 401
        ctx.body = 'token verify fail'
      }
    }
    await next()
  } catch (err) {
    if(err.status === 401) {
      ctx.status = 401
      ctx.body = 'unauthorized，请求需要用户的身份认证！'
    } else {
      err.status = 404
    }
  }
}