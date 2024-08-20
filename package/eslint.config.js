import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
    ignores: ["dist"],
  },

  {
    name: "global",
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
      },
    },
  },

  {
    name: "react",
    files: ["**/*.{jsx,tsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      jsxA11y.flatConfigs.recommended,
    ],

    plugins: { "react-hooks": fixupPluginRules(reactHooks) },
    rules: { ...reactHooks.configs.recommended.rules },

    settings: {
      react: { version: "detect" },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
  },

  {
    name: "typescript",
    files: ["**/*.{ts,mts,tsx}"],
    extends: [...tseslint.configs.recommended, importPlugin.configs.typescript],

    languageOptions: { parserOptions: { project: true } },

    plugins: {
      import: fixupPluginRules(importPlugin),
    },

    settings: {
      "import/internal-regex": "^~/",
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", ".js", ".mjs", ".cjs"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      ...importPlugin.configs.recommended.rules,
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },

  {
    name: "simple-import-sort",
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Type imports.
            ["^.*\\u0000$"],
            // Side effect imports.
            ["^\\u0000"],
            // Node.js builtins prefixed with `node:`.
            ["^node:"],
            // Packages.
            // Packages. `react` related packages come first.
            ["^react", "^@remix-run"],
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^@?\\w"],
            // Workspace packages
            ["^@asd"],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^"],
            // Relative imports.
            // Anything that starts with a dot.
            ["^\\."],
            // Style imports.
            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
  },
);

export default config;
