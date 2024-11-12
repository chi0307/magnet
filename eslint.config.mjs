import eslint from '@eslint/js'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPerfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsEslintPlugin,
      'perfectionist': eslintPerfectionist,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'side-effect',
            ['builtin-type', 'builtin'],
            ['external-type', 'external'],
            ['internal-type', 'internal'],
            ['parent-type', 'parent', 'sibling-type', 'sibling'],
            'object',
            'unknown',
          ],
          internalPattern: ['@/**'],
        },
      ],
    },
  },
  {
    files: ['vite.config.ts', 'uno.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },
  {
    files: ['generate-pages.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.generate.json'
      }
    }
  },
  {
    ignores: ['**/dist/*', 'eslint.config.mjs', '**/dist-generate-html/*'],
  },
  eslintConfigPrettier,
);
