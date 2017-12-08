module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint',
    },
    plugins: [
        'import',
        'promise',
        'vue'
    ],
    env: {
        browser: true,
        es6: true,
        jquery: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [
        '../.eslintrc.base.js',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:promise/recommended',
        'plugin:vue/base',
        'plugin:vue/recommended',
    ],
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: [
                    'node_modules',
                    'bower_components'
                ]
            }
        }
    },
    rules: {
        // Disallow spaces inside of brackets.
        'array-bracket-spacing': ['error', 'never'],
        // Require parens in arrow function arguments.
        'arrow-parens': ['error', 'as-needed'],
        // Require space before/after arrow function’s arrow.
        'arrow-spacing': ['error'],
        // Disallow arrow functions where they could be confused with
        // comparisons.
        'no-confusing-arrow': ['error'],
        // Require let or const instead of var
        'no-var': ['error'],
        // Enforce consistent spacing inside braces.
        'object-curly-spacing': ['error', 'never'],
        // Suggest using const.
        'prefer-const': ['error'],
        // Enforce consistent spacing before opening parenthesis in function
        // definitions.
        'space-before-function-paren': ['error',  {
            'anonymous': 'always',
            'named': 'always',
            'asyncArrow': 'always'
        }],
        // Allow async-await.
        'generator-star-spacing': ['off'],
        // Allow debugger during development.
        'no-debugger': process.env.NODE_ENV === 'production' ? ['error'] : ['off'],

        // Vue.js
        // Enforce valid `v-if` directives.
        'vue/no-invalid-v-if': ['error'],
        // Enforces that a return statement is present in computed property.
        'vue/return-in-computed-property': ['error', {
            treatUndefinedAsUnspecified: true
        }],
        // Enforce v-bind directive style.
        'vue/v-bind-style': ['error', 'shorthand'],
        // Enforce v-on directive style.
        'vue/v-on-style': ['error', 'shorthand'],
    }
};
