/** @type {import("prettier").Config} */
export default {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  singleAttributePerLine: true,
  jsxSingleQuote: false,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-packagejson",
  ],
  tailwindStylesheet: "./src/index.css",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    "^react$",
    "^react-dom(.*)$",
    "^react-router(.*)$",

    "<THIRD_PARTY_MODULES>",

    "^@/config/(.*)$",
    "^@/layouts/(.*)$",
    "^@/pages/(.*)$",
    "^@/router/(.*)$",
    "^@/providers/(.*)$",
    "^@/components/(.*)$",
    "^@/hooks/(.*)$",
    "^@/services/(.*)$",
    "^@/lib/(.*)$",
    "^@/utils/(.*)$",
    "^@/store/(.*)$",
    "^@/types/(.*)$",
    "^@/assets/(.*)$",

    "^[./]",
  ],
};
