const ignore_domain = [
  'localhost',
  '127.0.0.1'
]

const whitelist = [
]

const Allow_Headers = [
  'Origin',
  'X-Requested-With',
  'Content-Type',
  'Accept',
  'Authorization'
]

module.exports = () => async(ctx, next) => {
  const host = (ctx.request.header.host).split(':')[0]
  const flag = await ignore_domain.some(item => item.indexOf(host) > -1)

  if(flag) {
    ctx.set('Access-Control-Allow-Origin', '*')
  } else {
    ctx.set('Access-Control-Allow-Origin', whitelist.join(', '))
  }
  ctx.set('Access-Control-Allow-Headers', Allow_Headers.join(', ')) // 允许headers使用Authorization
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
  // ----- 跨域时，先发送一个options请求，此处要返回200 -----
  if (ctx.method === 'OPTIONS') {
    ctx.status = 200
    return
  }
  await next()
}