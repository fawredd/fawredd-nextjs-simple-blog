import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import { types } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    settings: {
      "import/resolver": {
          typescript: {},
          node: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
            moduleDirectory: ["node_modules", "./"],
          },
      },
    },
    rules: {
      "import/no-unresolved": "error",
      "import/no-extraneous-dependencies": "error",
    },
  },
];

export default eslintConfig;
