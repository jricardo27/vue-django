// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    env: {
        node: true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    'rules': {
        'eqeqeq': ['error', 'always'],
        'indent': ['error', 4, {'SwitchCase': 1}],
        'semi': ['error', 'always'],
        'semi-spacing': ['error'],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'always',
        }],
        'space-infix-ops': ['error'],
        'space-unary-ops': ['error'],
        'spaced-comment': ['error', 'always'],
        'camelcase': ['off'],
        'quotes': ['off'],
    }
}
