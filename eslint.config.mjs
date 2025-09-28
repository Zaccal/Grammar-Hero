import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    './apps/web/src/components/ui',
    './apps/server/prisma/',
    './apps/web/src/routeTree.gen.ts',
  ],
  formatters: true,
  react: true,
  rules: {
    'react/no-context-provider': 'off',
  },
  stylistic: {
    overrides: {
      'comma-dangle': ['off', 'never'],
      'comma-style': ['off', 'never'],
      'style/comma-dangle': ['off', 'never'],
      'style/comma-style': ['off', 'never'],
      'style/operator-linebreak': ['off', 'never'],
      'style/arrow-parens': ['off', 'never'],
    },
  },
})
