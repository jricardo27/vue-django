let path = require('path');
let config = require('../config');
let webpack = require('webpack');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.base.conf');
let cssLoaders = require('./css-loaders');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: path.join(config.build.assetsSubDirectory, '[name].[chunkhash].js'),
        chunkFilename: path.join(config.build.assetsSubDirectory, '[id].[chunkhash].js')
    },
    vue: {
        loaders: cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(path.join(config.build.assetsSubDirectory, '[name].[contenthash].css')),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        })
    ]
});
