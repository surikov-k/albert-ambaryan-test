const eslintConfigPrettier = require("eslint-config-prettier");

const nx = require("@nx/eslint-plugin");
const baseConfig = require("../../eslint.config.cjs");

module.exports = [
  eslintConfigPrettier,
  ...baseConfig,
  ...nx.configs["flat/react"],
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      semi: ["error"],
      quotes: ["error", "double"],
    },
  },
];
