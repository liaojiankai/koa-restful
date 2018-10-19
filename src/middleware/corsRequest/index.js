const { corsConf } = require('../../config')
const { IGNORE_DOMAIN, whitelistOrigin, Expose_Headers, Allow_Headers } = corsConf

const isContained = (minArr, maxArr) => minArr.every(i => maxArr.some(o => o === i))
const firstWordUpperCase = (str) => str.toLowerCase().replace(/(\-|^)[a-z]/g, (char) => char.toUpperCase())
const NODE_ENV = process.env.NODE_ENV

module.exports = () => async(ctx, next) => {
  const origin = ctx.get('Origin')
  const flag = whitelistOrigin.some(i => origin.indexOf(i) > -1)
  if(NODE_ENV === 'development') {
    // ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Origin', ctx.get('Origin'))
  } else {
    if(flag) {
      ctx.set('Access-Control-Allow-Origin', origin)
    } else {
      ctx.status = 400
      return
    }
  }
  ctx.set('Access-Control-Allow-Headers', Allow_Headers.join(', ')) // 允许headers使用Authorization
  ctx.set('Access-Control-Expose-Headers', Expose_Headers.join(', ')) // 应许Client访问header字段
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
  ctx.set('Access-Control-Max-Age', 5)

  // ----- 跨域时，先发送一个options请求，此处要返回204 -----
  if (ctx.method === 'OPTIONS') {
    const preflightHeader = ctx.get('Access-Control-Request-Headers').split(',').map(i => firstWordUpperCase(i))
    const isContain = isContained(preflightHeader, Allow_Headers) // 全包含
    if(isContain) {
      ctx.set('Access-Control-Allow-Headers', preflightHeader.join(', '))
      ctx.status = 204
      return
    } else {
      ctx.status = 400
      return
    }
  }
  await next()
}