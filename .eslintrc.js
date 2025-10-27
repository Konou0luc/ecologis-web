module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'no-useless-escape': 'warn',
    'import/no-anonymous-default-export': 'warn'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': process.env.CI ? 'warn' : 'off',
        'react-hooks/exhaustive-deps': process.env.CI ? 'warn' : 'off',
        'jsx-a11y/anchor-is-valid': process.env.CI ? 'warn' : 'off',
        'no-useless-escape': process.env.CI ? 'warn' : 'off',
        'import/no-anonymous-default-export': process.env.CI ? 'warn' : 'off'
      }
    }
  ]
};
