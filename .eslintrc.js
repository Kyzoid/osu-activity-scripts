module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": 2021
  },
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "plugins": [],
  "rules": {}
};