/*
* @ author liaoernan
* @ use 阿里云oss对象存储实现，用于文件上传
* @ 具体调用可见/controllers/frontend/shared
* @ Document https://www.alibabacloud.com/help/zh/doc-detail/32068.htm?spm=a2c63.p38356.b99.276.6e5d4bf2n57MsQ
*/

module.exports = {
  region: 'oss-cn-hangzhou.aliyuncs.com', // <oss region>
  accessKeyId: 'LTAIzrSgFDPnNWYj', // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS
  accessKeySecret: 'bgwQ3p4u3uvnfBWSxQwPPUNIhRfKOt',
  bucket: '',
  folder: 'uploads/'  // 上传到空间的images文件夹下，可自定义，文件夹需提前创建
}