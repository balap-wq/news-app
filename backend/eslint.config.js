import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  // Disable ESLint rules that conflict with Prettier
  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },

    rules: {
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',

      // 🔥 THIS LINE CONNECTS PRETTIER
      'prettier/prettier': 'error',
    },
  },
];
