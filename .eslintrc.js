module.exports = {
  "extends": ["react-app","airbnb"],
  "parser": "@typescript-eslint/parser", 
  "plugins": ["@typescript-eslint"],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  "rules": {
    "react/jsx-filename-extension": 0,
    "import/extensions": [ 0, {
      "ts": "never",
      "tsx": "never",
      "json": "always"
    }],
    "no-plusplus": 0,
    "import/prefer-default-export": 0, 
    "max-len": 1,
    "default-case": 0,
    "react/prop-types": 0,
    "react/no-array-index-key": 1, 
    "no-underscore-dangle": 0,
  },
  "overrides": [
    {
      "files": ["*.ts","*.tsx"],
      "rules": {
      }
    }
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
}
