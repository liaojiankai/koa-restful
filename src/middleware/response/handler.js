const defaultResponse = {
  data: [],
  status: {
    code: 0,
    message: 'SUCCESS'
  }
}

/**
 * response
 * @param ctx
 * @param data
 * @param code 错误码 || 错误描述
 * @param message 错误描述
 */

 const response = (ctx, data, code, message) => {
   if(typeof code === 'object') {
     message = code[1]
     code = code[0]
   }
   ctx.body = {
     data,
     status: {
       code,
       message
     }
   }
 }

 exports.success = (ctx, data, code = 0, message) => {
   if(typeof code === 'string') {
     message = code
   }
   response(ctx, data, code, message)
 }

 exports.error = (ctx, code = 1, message = 'ERROR') => {
   if(typeof code === 'object') {
     message = code[1]
     code = code[0]
   }
   response(ctx, defaultResponse.data, code, message)
 }