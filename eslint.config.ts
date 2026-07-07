import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginRouter from '@tanstack/eslint-plugin-router'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig({
  ignores: ['dist', 'node_modules', 'coverage'],
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    react.configs.flat.recommended,
    reactHooks.configs.flat['recommended-latest'], // <- usa a config pronta, sem montar manualmente
    jsxA11y.flatConfigs.recommended,
    ...pluginRouter.configs['flat/recommended'],
    eslintConfigPrettier,
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      // tsconfigRootDir: process.cwd(),
    },
    globals: globals.browser,
  },
  plugins: {
    'react-refresh': reactRefresh,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/only-throw-error': [
      'error',
      {
        allow: [
          { from: 'package', package: '@tanstack/router-core', name: 'Redirect' },
          { from: 'package', package: '@tanstack/router-core', name: 'NotFoundError' },
        ],
      },
    ],
  },
})
