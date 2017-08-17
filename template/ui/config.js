// See http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        entry: {
            base: './src/entries/base.js',
            components: './src/entries/components.js',
        },
        index: path.resolve(__dirname, 'templates/index.html'),
        assetsRoot: path.resolve(__dirname, 'static'),
        assetsSubDirectory: '/',
        assetsPublicPath: '/',
        productionSourceMap: true
    },
    dev: {
        port: 8080,
        proxyTable: {}
    }
}
