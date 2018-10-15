
module.exports = class IndexController {
  static index(ctx) {
    ctx.res.ok({
      data: {a: 1},
      message: '成功'
    })
  }
}
