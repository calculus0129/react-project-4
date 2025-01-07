import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
  ),
  {
    rules: {
      "prettier/prettier": "warn", // Prettier issues as warnings
    },
  },
  {
    files: ["*.ts", "*.tsx"], // Apply TypeScript specific rules
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Allow any type
      "@typescript-eslint/consistent-type-imports": "error", // Use type imports
      "@typescript-eslint/consistent-type-definitions": "error", // Use type for type definitions
      "@typescript-eslint/prefer-namespace-keyword": "error", // Prefer namespace over module
      "@typescript-eslint/no-unused-vars": [
        // Allow unused vars with underscore prefix
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];

export default eslintConfig;
