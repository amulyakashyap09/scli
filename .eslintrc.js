module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  rules: {
    "no-console": 0,
    'indent': [2, 'tab'],
    'no-tabs': 0,
    'function-paren-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'no-throw-literal': 0,
    'no-underscore-dangle': [2, { allowAfterThis: true }],
    'no-bitwise': [2, { int32Hint: true }],
  },
  overrides: [
    {
      files: ['test/**/*.js'],
      rules: {
        'global-require': 0, // used to require modules in unit tests
        'no-unused-vars': 0, // used to stub functions in unit tests
      },
    },
  ],
};
