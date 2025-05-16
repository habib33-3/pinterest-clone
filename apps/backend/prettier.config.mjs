/** @type {import('prettier').Config} */
export default {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    printWidth: 100,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    endOfLine: "lf",
    quoteProps: "consistent",

    // Meaningful Import Sorting matching tsconfig paths
    importOrder: [
        // Node.js built-ins (with and without node: prefix)
        "^node:(.*)$",
        "^(fs|path|os|http|https|crypto|util|stream)(/.*)?$",

        // External libraries
        "^express$",
        "^express-(.*)$",
        "<THIRD_PARTY_MODULES>",

        // Global configuration and utilities
        "^@/config/(.*)$",
        "^@/lib/(.*)$",
        "^@/utils/(.*)$",
        "^@/types/(.*)$",
        "^@/shared/(.*)$",

        // Core application structure
        "^@/validations/(.*)$",
        "^@/middlewares/(.*)$",
        "^@/services/(.*)$",
        "^@/models/(.*)$",
        "^@/controllers/(.*)$",

        // Application-specific modules
        "^@/app/(.*)$",
        "^@/(.*)$",

        // Relative imports
        "^[./]",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: true,

    plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-packagejson"],

    overrides: [
        {
            files: "*.prisma",
            options: {
                parser: "prisma",
                tabWidth: 4,
                printWidth: 120,
            },
        },
        {
            files: "*.sql",
            options: {
                parser: "sql",
                keywordCase: "upper",
                identifierCase: "lower",
            },
        },
        {
            files: ["*.json", "*.jsonc"],
            options: {
                parser: "json",
                tabWidth: 2,
            },
        },
        {
            files: "*.yml",
            options: {
                parser: "yaml",
                tabWidth: 2,
            },
        },
    ],
};
