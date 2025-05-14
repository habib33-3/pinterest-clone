import eslint from "@eslint/js";
import eslintPluginN from "eslint-plugin-n";
import eslintPluginSecurity from "eslint-plugin-security";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

// === 🌐 Ignore Patterns ===
const ignorePatterns = {
    ignores: [
        "**/dist/**",
        "**/node_modules/**",
        "**/coverage/**",
        "**/public/**",
        "**/views/**",
        "*.mjs",
    ],
};

// === 📄 File-Specific Overrides ===
const jsFileOverrides = {
    files: ["**/*.js", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
};

// === 🧠 TypeScript ESLint Rules ===
const tsRules = {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
        "warn",
        {
            args: "after-used",
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description" }],
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/no-magic-numbers": ["warn", { ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }],
    "@typescript-eslint/no-empty-object-type": "off",
};

// === 🐢 Node Plugin Rules ===
const nodeRules = {
    "n/no-missing-require": "error",
    "n/no-extraneous-import": "error",
    "n/no-extraneous-require": "error",
    "n/no-unsupported-features/es-syntax": "off",
    "n/no-process-exit": "error",
};

// === 🛡️ Security Plugin Rules ===
const securityRules = {
    "security/detect-buffer-noassert": "error",
    "security/detect-child-process": "error",
    "security/detect-disable-mustache-escape": "error",
    "security/detect-eval-with-expression": "error",
    "security/detect-new-buffer": "error",
    "security/detect-no-csrf-before-method-override": "error",
    "security/detect-non-literal-fs-filename": "error",
    "security/detect-non-literal-regexp": "error",
    "security/detect-non-literal-require": "warn",
    "security/detect-object-injection": "warn",
    "security/detect-possible-timing-attacks": "error",
    "security/detect-pseudoRandomBytes": "error",
    "security/detect-unsafe-regex": "error",
};

// === 🧠 SonarJS Rules ===
const sonarRules = {
    "sonarjs/no-all-duplicated-branches": "error",
    "sonarjs/no-element-overwrite": "error",
    "sonarjs/no-extra-arguments": "error",
    "sonarjs/no-identical-conditions": "error",
    "sonarjs/no-identical-expressions": "error",
    "sonarjs/no-one-iteration-loop": "error",
    "sonarjs/no-use-of-empty-return-value": "error",
    "sonarjs/no-collapsible-if": "error",
    "sonarjs/no-duplicate-string": "warn",
    "sonarjs/no-duplicated-branches": "error",
    "sonarjs/no-inverted-boolean-check": "error",
    "sonarjs/no-redundant-boolean": "error",
    "sonarjs/no-unused-collection": "error",
    "sonarjs/no-useless-catch": "error",
    "sonarjs/prefer-immediate-return": "error",
};

// === 🦄 Unicorn Rules ===
const unicornRules = {
    // Add or enable rules as needed
};

// === 📜 General JavaScript Best Practices ===
const jsBestPractices = {
    "no-implied-eval": "error",
    "no-script-url": "error",
    "no-buffer-constructor": "error",
    "no-process-exit": "error",
    "no-process-env": "warn",
    "no-sync": ["error", { allowAtRootLevel: false }],
    "require-atomic-updates": "error",
    "no-caller": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-floating-decimal": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-multi-str": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-proto": "error",
    "no-return-await": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-with": "error",
    "no-console": "warn",
    "prefer-promise-reject-errors": "error",
    "radix": "error",
    "no-duplicate-imports": "error",
};

// === 🧠 Final Export ===
export default tseslint.config(
    ignorePatterns,
    jsFileOverrides,
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    {
        settings: {
            "import/resolver": {
                typescript: {
                    project: "./tsconfig.json",
                },
            },
        },
        plugins: {
            unicorn: eslintPluginUnicorn,
            security: eslintPluginSecurity,
            sonarjs: eslintPluginSonarjs,
            n: eslintPluginN,
        },
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        rules: {
            ...tsRules,
            ...nodeRules,
            ...securityRules,
            ...sonarRules,
            ...unicornRules,
            ...jsBestPractices,
        },
    }
);
