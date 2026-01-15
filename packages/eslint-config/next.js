import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import pluginTailwindcss from 'eslint-plugin-tailwindcss'
import tseslint from 'typescript-eslint'

import { config as baseConfig } from './base.js'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...compat.extends('next'),
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    plugins: {
      tailwindcss: pluginTailwindcss,
    },
    settings: {
      tailwindcss: {
        config: './tailwind.config.ts',
        cssFiles: ['**/*.css', '!**/node_modules/**', '!**/dist/**', '!**/build/**'],
      },
    },
    rules: {
      ...pluginTailwindcss.configs.recommended.rules,
    },
  },
]
