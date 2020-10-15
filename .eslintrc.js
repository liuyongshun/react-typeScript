/** @format */

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'], //使用推荐的React代码检测规范
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': 'error',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
}
