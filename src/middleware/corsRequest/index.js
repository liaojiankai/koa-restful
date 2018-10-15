const ignore_domain = [
  'localhost',
  '127.0.0.1'
]
// 域名白名单
const whitelist = [
]

const Expose_Headers = [

]

const Allow_Headers = [
  'Origin',
  'X-Requested-With',
  'Content-Type',
  'Accept',
  'Authorization'
]

const isContained = (minArr, maxArr) => minArr.filter(i => maxArr.some(o => o === i))
const simpleCmpareArrary = () => {
  for (var i = 0; i < arguments.length; i++) {
    return arguments[i].toString() == arguments[i + 1] ? true : false;
  }
}

module.exports = () => async(ctx, next) => {
  const host = (ctx.request.header.host).split(':')[0]
  const flag = await ignore_domain.some(item => item.indexOf(host) > -1)

  if(flag) {
    ctx.set('Access-Control-Allow-Origin', '*')
  } else {
    ctx.set('Access-Control-Allow-Origin', whitelist.join(', '))
  }
  ctx.set('Access-Control-Allow-Headers', Allow_Headers.join(', ')) // 允许headers使用Authorization
  ctx.set('Access-Control-Expose-Headers', Expose_Headers.join(',')) // 应许
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie

  // ----- 跨域时，先发送一个options请求，此处要返回204 -----
  if (ctx.method === 'OPTIONS') {
    const preflightHeader = ctx.get('Access-Control-Request-Headers').split(',')
    const isContain = isContained(Allow_Headers, preflightHeader) // 全包含
    if(isContain) {
      ctx.status = 204
    } else {
      ctx.status = 400
    }
  }
  await next()
}