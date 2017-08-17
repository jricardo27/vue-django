// http://eslint.org/docs/user-guide/configuring
var path = require('path');

module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint',
    },
    env: {
        browser: true,
        es6: true,
        jquery: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
        'plugin:import/errors'
    ],
    settings: {
        "import/resolver": {
            node: {
                moduleDirectory: [
                    "node_modules",
                    "bower_components"
                ]
            }
        }
    },
    'rules': {
        'vue/no-invalid-v-if': 'error',
        "arrow-parens": ["error", "as-needed"],
        "arrow-spacing": ["error"],
        "eqeqeq": ["error", "always"],
        "indent": ["error", 4, {"SwitchCase": 1}],
        "no-confusing-arrow": ["error"],
        "no-var": ["error"],
        "semi": ["error"],
        "semi-spacing": ["error"],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "always",
            "asyncArrow": "always"
        }],
        "space-infix-ops": ["error"],
        "space-unary-ops": ["error"],
        "spaced-comment": ["error", "always"],
        // Allow async-await
        'generator-star-spacing': ["off"],
        // Allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? ["error"] : ["off"]
    }
}
