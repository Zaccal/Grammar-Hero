import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    './apps/web/src/components/ui',
    './apps/server/prisma/',
    './apps/web/src/routeTree.gen.ts',
  ],
  formatters: true,
  typescript: true,
  react: true,
  rules: {
    'react/no-context-provider': 'off',
    'curly': ['error', 'multi-line'],
  },
  stylistic: {
    overrides: {
      'comma-dangle': ['off', 'never'],
      'comma-style': ['off', 'never'],
      'style/max-statements-per-line': ['error', { max: 3 }],
      'style/comma-dangle': ['off', 'never'],
      'style/comma-style': ['off', 'never'],
      'style/operator-linebreak': ['off', 'never'],
      'style/arrow-parens': ['off', 'never'],
      'style/indent': ['off', 'never'],
      'style/jsx-one-expression-per-line': ['off', 'never'],
    },
  },
})
