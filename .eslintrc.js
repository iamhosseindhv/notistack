// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    parser: 'babel-eslint',
    globals: {
        process: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        'no-unused-vars': [
            'warn',
            {
                ignoreRestSiblings: true,
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            env: {
                browser: true,
                es6: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:prettier/recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2022,
                sourceType: 'module',
                project: './tsconfig.json',
            },
            rules: {
                'prettier/prettier': 'error',
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    {
                        ignoreRestSiblings: true,
                    },
                ],
            },
        },
    ],
};
