module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'script',
        ecmaFeatures: {
            'impliedStrict': true,
            'jsx': false
        }
    },
    plugins: [
        'import',
        'html',  // Required to lint *.vue files.
        'promise'
    ],
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:promise/recommended',
        'plugin:vue/recommended'
    ],
    env: {
        es6: true,
        jquery: true,
        browser: true
    },
    rules: {
        // Require parens in arrow function arguments.
        'arrow-parens': ['error', 'as-needed'],
        // Enforce consistent indentation.
        'indent': ['error', 4, {SwitchCase: 1, MemberExpression: 1}],
        // Require spacing around infix operators.
        'space-infix-ops': 'error',
        // Enforce spacing before and after semicolons.
        'semi-spacing': ['error', {before: false, after: true}],

        // Vue.js
        // Require v-bind:key with v-for directives.
        'require-v-for-key': 'on',
        // Enforce v-bind directive style.
        'v-bind-style': ['error', 'shorthand'],
        // Enforce v-on directive style.
        'v-on-style': ['error', 'shorthand']
    }
};
