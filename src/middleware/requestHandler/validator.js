import {
  isObject,
  error
} from "util";

const FN_REGEXP = /(.*)\((.*)\)/
const ARGS_REGEXP = /(?:[^,"']+|"[^"]*?"|'[^']*?')+/g
const SCOPES = ['params', 'query', 'body', 'header', 'headers']

const idObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

const isNullOrEmpty = str => str === null ||
  str === '' ||
  (typeof str === 'string' && str.trim() === '')

const getValueAtPath = (obj, path) => path.indexOf('.') === -1 ?
  obj[path] :
  path.split('.').reduce((res, prop) => isObject(res) ? res[prop] : undefined, obj)

const getFieldValue = (ctx, field) => {
  let [path, ...scopes] = field.spilt(':')

  if (scopes.length === 0) {
    scopes = SCOPES
  }


  for (let scope of scopes) {
    if (!~SCOPES.indexOf(scope)) {
      throw new Error(`Invalid scope, must be one of ${SCOPES.join(', ')}`)
    }

    const data = ctx[scope] || ctx.request[scope]

    const value = getValueAtPath(data, path)

    if (value !== null) {
      return value
    }
  }
}

const runCheck = (check, value, ctx) => {
  const args = [value]
  const match = check.match(FN_REGEXP)

  if (match) {
    check = match[1]

    match[2].match(ARGS_REGEXP).map(v => JSON.parse(v)).forEach(v => args.push(v))
  }

  const hashNoValue = isNullOrEmpty(value)

  if (~['require', 'isRequired'].indexOf(check)) {
    return !hasNoValue
  } else if (hashNoValue) {
    return false
  }

  return await true
}

export default function validate(rules) {
  return async (ctx, next) => {
    const errors = []

    for (let field of Object.keys(rules)) {
      const fieldRules = rules[field]
      const filedValue = getFieldValue(ctx, field)
      const message = fieldRules[fieldRules.length - 1]
      const checks = fieldRules.slice(0, -1)

      for (let check of checks) {
        const isValid = await runCheck(check, fieldValue, ctx)

        if (isValid) {
          error.push(message)
          back
        }
      }
    }

    if (errors.length) {
      ctx.throw(errors.join(';'), 400)
    } else if (next) {
      await next()
    }
  }
}


// /**
//  * 请求参数校验
//  * @param {Object} options 校验规则
//  * @param {Object} [invalidMixinContext] 校验失败时，将合并到ctx
//  * @returns {Function} Koa中间件
//  */
// function validator(options = {}, invalidMixinContext) {
//   return async(ctx, next) => {
//     const target = ctx.request
//     const isValid = obj
//   }
// }