var gulp = require('gulp');
var spawn = require('child_process').spawn;
var exec = require('child_process').execSync;
var minimist = require('minimist');
var del = require('del');

var destinationDir = 'ui/static';
var pythonScript = 'scripts/tests/run';

/**
 * Configuration variables as passed in from the command line
 */
var config = minimist(process.argv.slice(2), {
    string: ['django-host'],
    default: {
        'django-host': '0.0.0.0',
        'django-port': 9000,
    },
});

/**
 * Creates a task for running a simple shell command
 * @param name - The name of the command (i.e. Django Runserver)
 * @param command - The command to run
 * @param args - A list of arguments to send to the command
 * @returns {Function} - The task function
 */

function shellTask (name, command, args) {
    return function () {
        var promise = new Promise(function (resolve, reject) { // eslint-disable-line no-undef
            var taskProcess = spawn(command, args, {stdio: 'inherit'});
            taskProcess.on('close', function (code) {
                if (code !== 0) {
                    reject(name + ' exited with error code: ' + code);
                } else {
                    console.log(name + ' exited normally.'); // eslint-disable-line no-console
                    resolve();
                }
            });
        });
        return promise;
    };
}

/**
 * Run the django development server
 */
gulp.task('run-django-dev-server', shellTask(
    'Django runserver',
    'python',
    ['manage.py', 'runserver', config['django-host'] + ':' + config['django-port']]
));

/**
 * Remove build directories
 */
gulp.task('clean', function () {
    return del([destinationDir]);
});

/**
 * Build documentation
 */
gulp.task('build-docs', function () {
    exec('make -C docs clean', {stdio: 'inherit'});
    exec('sphinx-apidoc -e -o docs/_autodoc {{ name }}', {stdio: 'inherit'});
    exec('make -C docs html', {stdio: 'inherit'});
});

/**
 * Build all static assets
 */
gulp.task('build', function () {
    return require('./ui/build/build').ready;
});

/**
 * Run the webpack dev server.
 */
gulp.task('run-webpack-dev-server', function () {
    return require('./ui/build/dev-server').ready;
});

/**
 * Run the common development stack
 */
gulp.task('run-stack', gulp.parallel(
    'run-webpack-dev-server'
));

/**
 * Run the full development stack
 */
gulp.task('run-dev', gulp.parallel(
    'run-django-dev-server',
    'run-stack'
));

/**
 * Run python tests.
 * This task will execute python test script with accepted parameters.
 *
 * Note: Run `gulp build` before running this task if the change is in javascript layer or related to static files.
*/
gulp.task('run-tests-python', shellTask(
    'Run python test script',
    'python',
    [pythonScript].concat(process.argv.slice(3))
));

/**
 * Run myro_ui tests.
 */
gulp.task('run-tests-ui', shellTask(
    'Run UI unit tests with karma',
    'npm',
    ['run', 'test']
));

gulp.task('run-tests-all', gulp.series('run-tests-ui', 'run-tests-python'));

/**
 * The default task is just to run a build
 */
gulp.task('default', gulp.series('build'));
