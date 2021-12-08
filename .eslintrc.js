module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
  },
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  overrides: [
    {
      files: ['**/*.spec.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
    },
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/unbound-method': 'error',
  },
};
