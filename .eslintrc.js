module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "max-len": ["error", { code: 180 }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "jsx-quotes": ["error", "prefer-double"],
    "react/display-name": "off",
    quotes: ["error", "single", { "allowTemplateLiterals": true }],
    semi: ["error", "always"],
    "comma-dangle": ["error", "never"],
    "indent": ["error", 4],
    "no-throw-literal" : "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
