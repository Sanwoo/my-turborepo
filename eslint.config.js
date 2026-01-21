import { nextJsConfig } from '@workspace/eslint-config/next-js'

/**
 * ESLint configuration for the root directory.
 * This configuration only applies to files in the root directory.
 * Sub-packages (apps/** and packages/**) have their own ESLint configurations.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...nextJsConfig,
  {
    ignores: ['apps/**', 'packages/**', 'node_modules/**', '.next/**', 'dist/**', 'build/**', '.turbo/**'],
  },
]
