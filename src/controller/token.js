const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const { secret, expiresIn } = require('../config').token

const findUser = async({username, password}) => {
  return username === 'user' && password === '123456'
}

const checkToken = async(username) => {
  return username === 'user'
}

module.exports = class Token {
  static async signin(ctx, next) {
    const { username, password } = ctx.request.body
    const isExist = await findUser({username, password})
    if(isExist) {
      const token = jwt.sign({ username }, secret, { expiresIn })
      ctx.body = token
      return
    }
    ctx.status = 401
  }

  static async verify(ctx, next) {
    const token = ctx.get('authorization')
    if(token) {
      try {
        const payload = await verify(token.split(' ')[1], secret)
        const isTrue = await checkToken(payload.username)
        ctx.body = isTrue
      } catch (error) {
        ctx.status = 401
      }
    } else {
      ctx.status = 400
    }
  }
}
