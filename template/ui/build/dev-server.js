require('./check-versions')();

var config = require('../config');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf');

// Default port where dev server listens for incoming traffic.
var port = process.env.PORT || config.dev.port;

// Automatically open browser, if not set will be false.
var autoOpenBrowser = !!config.dev.autoOpenBrowser;

// Define HTTP proxies to your custom API backend.
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);
var cors = require('cors');

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    heartbeat: 2000,
});

// Force page reload when html-webpack-plugin template changes.
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'});
        cb();
    });
});

// Print errors on compilation.
compiler.plugin('done', function (stats) {
    if (stats.compilation.errors && stats.compilation.errors.length &&
            process.argv.indexOf('--watch') === -1) {
        var errors = stats.compilation.errors;

        if (Array.isArray(errors)) {
            errors.forEach(error => {
                console.error(error);
            });
        } else {
            console.error(errors);
        }
    }
});

app.use(cors());

var dummyJSResponse = express();

dummyJSResponse.get('/', function (req, res) {
    res.send('console.log("Information: ' + req.baseUrl + ' is not needed in dev environment.");');
});

// Provide a dummy message for these files.
app.use(
    ['vendor.js', 'manifest.js'].map(function (file) {
        return '/' + config.UI_DIR_NAME + '/js/' + file;
    }),
    dummyJSResponse);

// Proxy api requests.
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];

    if (typeof options === 'string') {
        options = {target: options};
    }

    app.use(proxyMiddleware(options.filter || context, options));
});

// Handle fallback for HTML5 history API.
app.use(require('connect-history-api-fallback')());

// Serve webpack bundle output
app.use(devMiddleware);

// Enable hot-reload and state-preserving
// compilation error display.
app.use(hotMiddleware);

// Serve pure static assets.
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n');

    // When env is testing, don't need open it.
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }

    _resolve();
});

var server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    },
};
