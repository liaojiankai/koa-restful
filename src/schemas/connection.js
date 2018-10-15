// 数据库连接
const mongoose = require('mongoose')
const { mongoConf } = require('../config')

const options = {
  poolSize: 5
};


mongoose.connect(mongoConf.url, options, error => {
  if (error) {
    console.log('[mongoose log] Error connecting to: ',mongoConf.url + '. ' + error);
    return process.exit(1);
  } else {
    return console.log('[mongoose log] Successfully connected to: ', mongoConf.url);
  }
});


module.exports = {
  connection: () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongoose connection error:'));
    db.once('open', () => {
      return console.log('mongoose open success');
    });
    mongoose.set('debug', true);
  }
};
