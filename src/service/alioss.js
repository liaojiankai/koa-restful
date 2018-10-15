const OSS = require('ali-oss')
const { alioss } = require('../config')

const client = new OSS(alioss)

module.exports = async(key, path) => new Promise((resolve, reject) => {
  try {
    const result = await client.put(key, path)
    resolve(result)
  } catch (error) {
    reject(error)
  }
})
