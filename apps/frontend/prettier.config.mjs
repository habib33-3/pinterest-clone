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
    // React-related imports
    "^react$",
    "^react-dom(.*)$",
    "^react-router(.*)$",

    // Third-party modules
    "<THIRD_PARTY_MODULES>",

    // Absolute imports (grouped by functionality)
    "^@/config/(.*)$",
    "^@/layouts/(.*)$",
    "^@/providers/(.*)$",
    "^@/components/(.*)$",
    "^@/hooks/(.*)$",
    "^@/services/(.*)$",
    "^@/store/(.*)$",
    "^@/lib/(.*)$",
    "^@/utils/(.*)$",
    "^@/types/(.*)$",
    "^@/assets/(.*)$",
    "^@/validations/(.*)$",
    "^@/ui/(.*)$",
    "^@/pages/(.*)$",
    "^@/form/(.*)$",
    "^@/router/(.*)$",

    // Relative imports (current directory and below)
    "^[./]",
  ],
};
