const bcrypt = require('bcrypt')

const saltTimes = 10

module.exports = class Passport {

/**
 * 加盐加密
 * @params password {string} 原始密码
 * @return hash {object} 加密密码
 */
  static async encrypt(password) {
    const salt = await bcrypt.genSaltSync(saltTimes)
    const hash = await bcrypt.hashSync(password, salt)
    return hash
  }

/**
 * 密码对比
 * @params password {string} 原始密码
 * @params hash {string} 加密密码
 * @return res {boolean} 比对结果 true:密码匹配 | false:密码不匹配
 */
  static async validate(password, hash) {
    const res = await bcrypt.compareSync(password, hash)
    return res
  }

}