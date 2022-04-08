module.exports = {
    devtool:'cheap-module-eval-source-map', 
    /**
     * 开启了sourcemap，
     * cheap:忽略文件的列信息，因为在开发环境中调试的时候列信息是没有用的
     * module：会定位到我们的TS源码，而不是经过loader转译后的js源码。
     * eval：会将sourcemap以dateUrl的形式打包到文件中，重定义速度很快，无需担心性能问题
     * source：
     * map：
     */
}