require('./check-versions')();

process.env.NODE_ENV = 'production';

var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');
var utils = require('./utils');

module.exports = {
    ready: new Promise((resolve, reject) => {
        var destinationDir = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

        rm(destinationDir, err => {
            if (err) {
                reject(chalk.red('Error clearing the directory.' + destinationDir + '\n'));
                return;
            }

            return utils
                .webpackCompilerTask(webpackConfig, 'Prod Build')
                .then(resolve, reject);
        });
    }),
};
