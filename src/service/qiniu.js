const QINIU = require('qiniu')
const { qiniu } = require('../config')

const uptoken = (bucket, key) => {
  const putPolicy = new QINIU.rs.PutPolicy(`${bucket}:${key}`)
  return putPolicy.token()
}

module.exports = (bucket, key) => {
  const token = uptoken(qiniu.bucket, key)
  const extra = new QINIU.io.PutExtra()
  return new Promise((resolve, reject) => {
    QINIU.io.putFile(token, key, path, extra, (err, ret) => {
      if(!err) {
        resolve({
          hash: ret.hash,
          key: ret.key,
          url: qiniu.baseUrl + ret.key
        })
      } else {
        reject(err)
      }
    })
  })
}
