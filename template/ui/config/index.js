// See http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

var UI_DIR_NAME = 'ui';

module.exports = {
    common: {
        baseDir: '',
        entry: {
            base: './src/entries/base.js',
            landing: './src/entries/landing.js',
        },
    },
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '/static/' + UI_DIR_NAME + '/',  // Must end with a slash.
        productionSourceMap: true,
        extractCSS: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: false,
        assetsSubDirectory: '',
        assetsPublicPath: 'http://localhost:8080/' + UI_DIR_NAME + '/', // must end with a slash.
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    },
    UI_DIR_NAME: UI_DIR_NAME,
};
