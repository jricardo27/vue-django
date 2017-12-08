// http://eslint.org/docs/user-guide/configuring
// JavaScript Standard Style: https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style

module.exports = {
    // Note that this order must be preserved because 'standard' is stricter than 'eslint:recommended'.
    // Also note that 'eslint:recommended' ships with some Vue rules.
    extends: ['eslint:recommended', 'standard'],
    rules: {
        // Require Camelcase.
        'camelcase': ['error', {"properties": "always"}],
        // Require trailing commas.
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'never',
        }],
        // Require following curly brace conventions.
        'curly': ['error', 'all'],
        // Require === and !==
        'eqeqeq': ['error', 'always'],
         // Enforce consistent indentation.
        'indent': ['error', 4, {'SwitchCase': 1, MemberExpression: 1}],
        // Allow two lines after imports.
        'no-multiple-empty-lines': ['error', {'max': 2}],
        // Enforce consistent linebreak style for operators.
        'operator-linebreak': ['off'],
        // Require semicolons instead of ASI.
        'semi': ['error', 'always'],
        // Enforce spacing before and after semicolons.
        'semi-spacing': ['error'],
        // Enforce consistent spacing before opening parenthesis in function
        // definitions.
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'always',
        }],
        // Require spacing around infix operators.
        'space-infix-ops': ['error'],
        // Require spaces before/after unary operators.
        'space-unary-ops': ['error'],
        // Requires a whitespace (space or tab) beginning a comment.
        'spaced-comment': ['error', 'always'],
    },
};
