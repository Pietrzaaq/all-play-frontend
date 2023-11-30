module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'semi': [2, "always"],
    'vue/first-attribute-linebreak': ["warn", {
      "singleline": "beside",
      "multiline": "below"
    }],
    "vue/html-indent": ["error", "tab", {
      "attribute": 1,
      "baseIndent": 0,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }]
  }
}