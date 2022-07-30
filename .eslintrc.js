module.exports = {
  root: true,
  extends: [
    // add more generic rulesets here, such as:
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};