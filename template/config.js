// see http://vuejs-templates.github.io/webpack for documentation.
let path = require('path');

module.exports = {
    build: {
        index: path.resolve(__dirname, 'app/templates/base.html'),
        assetsRoot: path.resolve(__dirname, 'static'),
        assetsSubDirectory: '/',
        assetsPublicPath: '/',
        productionSourceMap: true
    },
    dev: {
        port: 8080,
        proxyTable: {}
    }
};
