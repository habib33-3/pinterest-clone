import js from "@eslint/js";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactX from "eslint-plugin-react-x";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import security from "eslint-plugin-security";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

const baseJsConfig = js.configs.recommended;

// === ⚡ TypeScript Rules ===
const typescriptRules = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      project: ["./tsconfig.json", "./tsconfig.*.json"],
    },
  },
  plugins: {
    "@typescript-eslint": typescriptPlugin,
  },
  rules: {
    ...typescriptPlugin.configs.recommended.rules,
    ...typescriptPlugin.configs["recommended-requiring-type-checking"].rules,
    ...typescriptPlugin.configs["strict-type-checked"].rules,
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
  },
};

// === ⚛️ React Recommended ===
const reactRecommendedConfig = {
  ...reactRecommended,
  settings: {
    react: {
      version: "detect",
    },
  },
};

// === ⚛️ React JSX Runtime ===
const reactJsxRuntimeConfig = jsxRuntime;

// === ⚛️ React Hooks ===
const reactHooksRules = {
  plugins: {
    "react-hooks": reactHooks,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-hooks/exhaustive-deps": "warn",
  },
};

// === 🔍 TanStack Query Rules ===
const tanstackQueryRules = {
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    "@tanstack/eslint-plugin-query": eslintPluginQuery,
  },
  rules: {
    "@tanstack/eslint-plugin-query/exhaustive-deps": "error",
    "@tanstack/eslint-plugin-query/stable-query-client": "error",
  },
};

// === 🦄 Unicorn Rules ===
const unicornRules = {
  plugins: {
    unicorn,
  },
  rules: {
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        ignore: ["^[A-Za-z0-9]+\\.[A-Za-z0-9]+$"],
      },
    ],
    "unicorn/prefer-module": "error",
    "unicorn/prefer-spread": "error",
    "unicorn/prefer-optional-catch-binding": "error",
    "unicorn/no-null": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-node-protocol": "off",
    "no-duplicate-imports": "error",
  },
};

// === 🌍 Environment and React Core Rules ===
const globalReactRules = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      React: "readonly",
      JSX: "readonly",
    },
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-key": "error",
    "react/self-closing-comp": "error",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "react/jsx-no-constructed-context-values": "warn",
    "react/jsx-boolean-value": "warn",
    "react/destructuring-assignment": ["error", "always"],
    "react/no-array-index-key": "warn",
    "react/no-deprecated": "warn",
    "react/no-danger": "error",
  },
};

// === ♿ JSX Accessibility Rules ===
const jsxA11yRules = {
  plugins: {
    "jsx-a11y": jsxA11y,
  },
  rules: {
    ...jsxA11y.recommended,
  },
};

// === 🔒 Security Plugin Rules ===
const securityRules = {
  plugins: {
    security,
  },
  rules: {
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-unsafe-regex": "warn",
  },
};

// === 💅 Prettier Config ===
const prettierRules = prettier;

// === 🧠 React DOM & React X Rules (Safe Load) ===
const reactDomReactXRules = {
  plugins: {
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    ...(reactX.configs?.["recommended-typescript"]?.rules ?? {}),
    ...(reactDom.configs?.recommended?.rules ?? {}),
  },
};

// === 🧠 Final Export ===
export default defineConfig([
  globalIgnores(["**/node_modules/", "**/dist/"]),
  baseJsConfig,
  typescriptRules,
  reactRecommendedConfig,
  reactJsxRuntimeConfig,
  reactHooksRules,
  tanstackQueryRules,
  unicornRules,
  globalReactRules,
  jsxA11yRules,
  securityRules,
  reactDomReactXRules,
  prettierRules,
]);
