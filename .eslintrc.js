// .eslintrc.js
const eslintrc = {
  parser: '@typescript-eslint/parser', // 使用 ts 解析器
  extends: [
    'eslint-config-ali' // eslint ali
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': [
      'off',
      {
        allow: ['warn', 'error']
      }
    ],
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'prefer-template': 'off',
    'prefer-const': 'off',
    'prefer-destructuring': 'off',
    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'prefer-promise-reject-errors': 'off',
    'arrow-body-style': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    'no-empty': 'off',
    'guard-for-in': 'off',
    'no-multi-assign': 'off'
  } // 自定义
};

module.exports = eslintrc;
