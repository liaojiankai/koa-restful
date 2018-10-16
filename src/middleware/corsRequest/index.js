const IGNORE_DOMAIN = [
  'localhost',
  '127.0.0.1'
]
// 域名白名单
const whitelistOrigin = [
]

//
const Expose_Headers = [

]

const Allow_Headers = [
  'Origin',
  'X-Requested-With',
  'Content-Type',
  'Accept',
  'Authorization'
]

const isContained = (minArr, maxArr) => minArr.every(i => maxArr.some(o => o === i))
const firstWordUpperCase = (str) => str.toLowerCase().replace(/(\-|^)[a-z]/g, (char) => char.toUpperCase())
const NODE_ENV = process.env.NODE_ENV
module.exports = () => async(ctx, next) => {

  const origin = ctx.get('Origin')
  const flag = whitelistOrigin.some(i => origin.indexOf(i) > -1)
  if(NODE_ENV === 'development') {
    ctx.set('Access-Control-Allow-Origin', '*')
  } else {
    if(flag) {
      ctx.set('Access-Control-Allow-Origin', whitelistOrigin.join(', '))
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
    } else {
      ctx.status = 400
      return
    }
  }
  await next()
}