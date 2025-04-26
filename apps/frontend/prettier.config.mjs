/** @type {import("prettier").Config} */
export default {
  // Basic formatting options
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  jsxSingleQuote: false,
  singleAttributePerLine: true,

  // Plugins
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-packagejson",
  ],

  // TailwindCSS plugin settings
  tailwindStylesheet: "./src/index.css",
  tailwindFunctions: ["clsx", "twMerge", "cn", "tw", "twJoin", "cva"],

  // Import sorting options
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    "^react$",
    "^react-dom(.*)$",
    "^react-router(.*)$",

    "<THIRD_PARTY_MODULES>",

    "^@/config/(.*)$",
    "^@/layouts/(.*)$",
    "^@/providers/(.*)$",
    "^@/components/(.*)$",
    "^@/hooks/(.*)$",
    "^@/services/(.*)$",
    "^@/lib/(.*)$",
    "^@/utils/(.*)$",
    "^@/store/(.*)$",
    "^@/types/(.*)$",
    "^@/assets/(.*)$",
    "^@/validations/(.*)$",
    "^@/ui/(.*)$",

    "^@/pages/(.*)$",
    "^@/form/(.*)$",
    "^@/router/(.*)$",

    "^[./]",
  ],
};
