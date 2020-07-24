module.exports = {
    devServer : {
        proxy : {
            '/api' : {
                target : 'https://getman.cn/mock',
                changeOrigin : true,
            }
        }
    }
}