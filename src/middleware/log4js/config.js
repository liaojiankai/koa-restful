const path = require('path')

//响应日志输出完整路径
const errorLogPath = path.resolve(__dirname, '../../../log/error')
//错误日志输出完整路径
const responseLogPath = path.resolve(__dirname, '../../../log/response')
const baseLogPath = path.resolve(__dirname, '../../../log')

module.exports = {
  appenders: {
    error: {
      type: 'dateFile',
      category: 'errLogger',
      filename: `${baseLogPath}/error/`,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: `${baseLogPath}/info/`,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    },
    cache: {
      type: 'dateFile',
      category: 'cacheLogger',
      filename: `${baseLogPath}/cache/`,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    }
  },
  categories: {
    error: {
      appenders: ['error'],
      level: 'error'
    },
    response: {
      appenders: ['response'],
      level: 'info'
    },
    default: {
      appenders: ['response'],
      level: 'info'
    }
  },
  replaceConsole: false
}