// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
import globals from "globals";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";

// export default [
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//   },
//   {
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//       },
//     },
//   },
//   {
//     rules: {
//       semi: "error",
//     },
//   },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

export default [
  {
    ignores: ["dist/**/*"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ignores: ["dist/**/*"],
    ...reactRecommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
    },
    rules: {
      // Rules here
    },
  },
];
