/** @format */

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
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
    },
    'import/resolver': {
      webpack: {
        config: './build/webpack.config.js'
      }
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
    'react/jsx-one-expression-per-line': 'off', // 关闭要求一个表达式必须换行的要求，和Prettier冲突
    'react/jsx-wrap-multilines': 'off', // 关闭要求jsx属性中写jsx必须要加括号，和Prettier冲突
    'jsx-a11y/no-static-element-interactions': 'off', // 关闭非交互元素加事件必须加 role
    'jsx-a11y/click-events-have-key-events': 'off', // 关闭click事件要求有对应键盘事件
    // 'react/jsx-filename-extension': 'off', // 关闭airbnb对于jsx必须写在jsx文件中的设置
    // 'react/prop-types': 'off', // 关闭airbnb对于必须添加prop-types的校验
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
    // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
}
