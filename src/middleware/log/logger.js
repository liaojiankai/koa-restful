const log4js = require('log4js')

const asscess = require('./access')

const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
const baseInfo = {
  appLogLevel: 'debug',
  dir: 'logs',
  env: 'dev',
  projectName: 'koa-demo',
  serverIp: '0.0.0.0'
}

module.exports = options => {
  const opts = Object.assign({}, baseInfo, options = {})
  const {
    env,
    appLogLevel,
    dir,
    serverIp,
    projectName
  } = opts

  let contextLogger = {}
  let appenders = {}

  appenders.cheese = {
    type: 'dateFile',
    filename: `${dir}/task`,
    pattern: '-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  }

  if (env === "dev" || env === "local" || env === "development") {
    appenders.out = {
      type: "console"
    }
  }

  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  }

  const logger = log4js.getLogger('cheese')

  return async (ctx, next) => {
    const start = Date.now()
    methods.forEach((method, i) => {
      contextLogger[method] = (message) => {
        logger[method](access(ctx, message, commonInfo))
      }
    })

    ctx.log = contextLogger

    await next()

    const end = Date.now() - start

    logger.info(access(ctx, {
      responseTime: `响应时间为${end/1000}s`
    }, commonInfo))
  }
}