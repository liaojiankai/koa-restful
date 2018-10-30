const path = require('path')

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
  },
  categories: {
    error: {
      appenders: ['error'],
      level: 'warn'
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
  // pm2: true,
  // pm2InstanceVar: 'INSTANCE_ID',
  disableClustering: true
}