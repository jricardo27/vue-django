module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['./.eslintrc.base.js'],
    parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
        ecmaFeatures: {
            'impliedStrict': true,
        }
    },
};
