module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'simple-import-sort', 'import'],
  rules: {
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'prettier/prettier': 'error',
  },
};
