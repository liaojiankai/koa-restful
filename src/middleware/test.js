const test = () => (ctx, next) => {
  console.log(ctx)
  next()
}

module.exports = test