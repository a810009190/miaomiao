module.exports = {
    lintOnSave: false,
    // publicPath : '/miaomiao',
    configureWebpack: {

        // other webpack options to merge in ...

    },

    // devServer Options don't belong into `configureWebpack`
    // devServer : {
    //     public : '192.168.1.6:8080',

    //     hot : true,

    //     disableHostCheck : true,

    //     proxy : {
    //         '/api' : {
    //             target : 'https://getman.cn/mock',
    //             changeOrigin : true,
    //         }
            
    //     }
    // }
}