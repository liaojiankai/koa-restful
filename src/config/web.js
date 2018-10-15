// webapi服务配置
const webAPIUrl = 'http://127.0.0.1:3000'
// 分发服务配置
const routeAPIUrl = 'http://127.0.0.1:3000'

module.exports = {
  "connUrls": [
    {
      "name": "webAPI",
      "text": "webAPI通讯接口",
      "url": webAPIUrl + "/api/conn/",
    },
    {
      "name": "routeAPI",
      "text": "分发服务器通讯接口",
      "url": routeAPIUrl + "/api/conn/",
    }
  ],
  "getSystemDateUrl": webAPIUrl + "/api/time",
  mongodbConnection: 'mongodb://localhost:27017/Test'
}