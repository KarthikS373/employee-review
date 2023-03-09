module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    es2021: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^[a-z]'],
              ['^@'],
              ['^~'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^.+\\.s?css$'],
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
  ],
  plugins: ['prettier', 'unused-imports', 'simple-import-sort'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': 1,
    'linebreak-style': 0,
    semi: 0,
    'simple-import-sort/imports': 1,
    'simple-import-sort/exports': 1,
    'import/prefer-default-export': 1,
    'import/extensions': 1,
  },
}
