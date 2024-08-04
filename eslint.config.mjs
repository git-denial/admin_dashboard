import unusedImports from "eslint-plugin-unused-imports";
import react from 'eslint-plugin-react'
import teslintparser from '@typescript-eslint/parser'

export default [{
    files: ["src/**/*.ts"],
    languageOptions: {
        parser: teslintparser
    },
    plugins: {
        "unused-imports": unusedImports,
        react,
    },
    rules: {
        "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "varsIgnorePattern": "^_",
                "args": "after-used",
                "argsIgnorePattern": "^_",
            },
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
}];