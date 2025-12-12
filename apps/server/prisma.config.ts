import type { PrismaConfig } from 'prisma/config'
import path from 'node:path'
import process from 'node:process'
import 'dotenv/config'

export default {
  schema: path.join('prisma', 'schema'),
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  migrations: {
    path: path.join('prisma', 'migrations'),
  },
} satisfies PrismaConfig
