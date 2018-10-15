const path = require('path')
const fs = require('fs')

module.exports = options => {
  let { app, rules = [] } = options

  if(!app) {
    throw new Error('the app params is necessary')
  }

  const appKeys = Object.keys(app)

  rules.forEach(keys => {
    let { path, name } = keys
    if(appKeys.includes(name)) {
      throw new Error(`the name of ${name} already exists!`)
    }

    let content = {}

    fs.readdirSync(path).forEach(filename => {
      let extname = Path.extname(filename)
      if (extname === '.js') {
        let name = Path.basename(filename, extname)
        content[name] = require(Path.join(path, filename))
      }
    })
    app[name] = content
  })
}