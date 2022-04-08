const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')
/**
 * webpack-merge：
 * 作用：将两个文件合并
 */


/**
 * 判断环境变量，
 */
let config = process.NODE_ENV === 'development' ? devConfig : proConfig

//最后将baseConfig和config合并
module.exports = merge(baseConfig,config)