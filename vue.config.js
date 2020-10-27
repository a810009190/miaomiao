module.exports = {
    lintOnSave: false,
    // 将静态资源的目录从根目录调整到miaomiao路径下
    publicPath : '/miaomiao',
    configureWebpack: {

        // other webpack options to merge in ...

    },

    // devServer Options don't belong into `configureWebpack`
    devServer : {
        host: '0.0.0.0',
        public : '192.168.1.5:8080',

        hot : true,

        disableHostCheck : true,
        https:false,
        proxy : {
            '/api' : {
                target : 'https://getman.cn/mock',
                changeOrigin : true,
            }
            
        }
    }
}