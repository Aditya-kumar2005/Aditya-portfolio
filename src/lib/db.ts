import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient() {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  )
}

let db: PrismaClient

try {
  db = getPrismaClient()
} catch (error) {
  // During build time, db might not be initialized
  console.warn('Database client not initialized:', error)
  db = undefined as any
}

export { db }

if (process.env.NODE_ENV !== 'production' && db) globalForPrisma.prisma = db
