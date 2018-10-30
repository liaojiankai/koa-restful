const Router = require('koa-router')
const {
  SwaggerRouter
} = require('koa-swagger-decorator')

const V1 = require('./v1')

const router = new SwaggerRouter()

// swagger docs avaliable at http://localhost:3000/api/swagger-html
router.swagger({
  title: 'Example Server',
  description: 'API DOC',
  version: '1.0.0',

  // [optional] default is root path.
  prefix: '/api',

  // [optional] default is /swagger-html
  swaggerHtmlEndpoint: '/swagger-html',

  // [optional] default is /swagger-json
  // swaggerJsonEndpoint: '/swagger-json',

  // [optional] additional options for building swagger doc
  // eg. add api_key as shown below
  swaggerOptions: {
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    }
  }
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
router.mapDir(__dirname, {
  // default: true. To recursively scan the dir to make router. If false, will not scan subroutes dir
  recursive: true,
  // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
  doValidation: true,
});


router.get('/test', (ctx, next) => {
  // ctx.throw(404)
  ctx.body = 'hello'
})

// router.use('/api/v1', V1.routes(), V1.allowedMethods())

module.exports = router