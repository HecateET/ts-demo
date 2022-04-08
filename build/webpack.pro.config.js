const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/**
 * 作用：每次成功构建之后帮助我们清空dist目录，
 * 有的时候为了避免缓存，我们会在文件后加上hash，
 * 这样在多次构建后就会产生很多无用的文件，
 * 通过这个插件就可以帮助我们清空dist文件
 */

module.exports = {
    plugins:[
        new CleanWebpackPlugin()
    ]
}