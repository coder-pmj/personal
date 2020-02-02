module.exports = {
    publicPath: './',
    outputDir: "dist",
    assetsDir: 'public',
    productionSourceMap: false,
    lintOnSave:'warning',
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui':'ELEMENT'
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: 'http://localhost:9900',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": ""
                }
            }

        }
    }
}