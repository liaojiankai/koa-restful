let formatError = (ctx, err, costTime) => {
  let method = ctx.method
  let url = ctx.url
  let body = ctx.request.body
  let userAgent = ctx.headers
  return {
    method,
    url,
    body,
    costTime,
    err,
    userAgent
  }
}
let formatRes = (ctx, costTime) => {
  const {
    method,
    url,
    body,
    response,
    headers
  } = ctx
  const request = {
    method,
    url,
    body,
    headers,
  }

  return {
    request,
    costTime,
    response,
  }
}
module.exports = {
  formatError,
  formatRes
}