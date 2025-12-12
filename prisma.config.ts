import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'apps/server/prisma/schema/schema.prisma',
  migrations: {
    path: 'apps/server/prisma/migrations',
    seed: 'bun run apps/server/prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
    // shadowDatabaseUrl: env('SHADOW_DATABASE_URL'),
  },
})
