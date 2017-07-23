module.exports = {
    root: true,
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.dev.conf.js'
            }
        }
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            'impliedStrict': true,
            'jsx': true
        }
    },
    plugins: [
        'import',
        'promise',
        'vue'
    ],
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:promise/recommended',
        'plugin:vue/base',
        'plugin:vue/recommended'
    ],
    env: {
        amd: true,
        browser: true,
        commonjs: true,
        es6: true,
        jquery: true,
        node: true
    },
    rules: {
        // Require parens in arrow function arguments.
        'arrow-parens': ['error', 'as-needed'],
        // Require space before/after arrow function’s arrow.
        'arrow-spacing': ['error'],
        // Require === and !==
        'eqeqeq': ['error', 'always'],
        // Enforce consistent indentation.
        'indent': ['error', 4, {SwitchCase: 1, MemberExpression: 1}],
        // Disallow arrow functions where they could be confused with
        // comparisons.
        'no-confusing-arrow': ['error'],
        // Require let or const instead of var.
        'no-var': ['error'],
        // Require or disallow semicolons instead of ASI.
        'semi': ['error'],
        // Enforce spacing before and after semicolons.
        'semi-spacing': ['error', {before: false, after: true}],
        // Enforce consistent spacing before opening parenthesis in function
        // definitions.
        'space-before-function-paren': ['error',  {
            'anonymous': 'always',
            'named': 'always',
            'asyncArrow': 'always'
        }],
        // Require spacing around infix operators.
        'space-infix-ops': ['error'],
        // Require or disallow spaces before/after unary operators.
        'space-unary-ops': ['error'],
        // Requires or disallows a whitespace (space or tab) beginning a comment.
        'spaced-comment': ['error', 'always'],

        // Vue.js
        // Enforce v-bind directive style.
        'vue/v-bind-style': ['error', 'shorthand'],
        // Enforce v-on directive style.
        'vue/v-on-style': ['error', 'shorthand'],
        // Enforces that a return statement is present in computed property.
        'vue/return-in-computed-property': ['error', {
            treatUndefinedAsUnspecified: true
        }]
    }
};
