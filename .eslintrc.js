module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: './**/tsconfig.json' // Specify it only for TypeScript files
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['**/*test'],
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off'
  }
}
