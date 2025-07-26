module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows modern ECMAScript features
    sourceType: 'module', // Allows use of imports
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'eslint-plugin-unused-imports'],
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'always'],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', vars: 'all' }],
    'no-var-requires': 'off',
    'unused-imports/no-unused-imports': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
};
