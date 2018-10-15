const { qiniu, alioss } = require('../../service')

class UploadController {
  static async qiniu (ctx, next) {
    const { fields, files } = ctx.require.body

    if(!files || files.file) {
      return ctx.body = {
        msg: '上传失败'
      }
    }
  }

   // 图片上传到阿里云oss中间件
   static async alioss(ctx,next){
    const { fields,files } = ctx.request.body
    if(!files||!files.file){
      return ctx.error({ msg: '上传失败!' })
    }

    const isexit = await fs.existsSync(files.file.path);
    if(!isexit) return ctx.error({ msg: '上传文件时发生错误!' });

    let filekey = id+files.file.name;
    if(globalConfig.alioss.folder){
      filekey = globalConfig.alioss.folder+filekey;
    }

    const result = await alioss(filekey,files.file.path);
    if( !result || !result.url ) return ctx.error({ msg: '上传到云端时发生错误!' });

    const { url } = result;
    fs.unlinkSync(files.file.path);
    ctx.upload = { url,id };  // 挂载在ctx, 传递给下个中间件
    await next();
  }
}