import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as {
    prisma?: PrismaClient | any
}

function createPrismaClient() {
    const base = new PrismaClient()

    // Enable the accelerate extension only when explicitly requested
    // (e.g. PRISMA_ACCELERATE=true). This prevents requiring a
    // Data-Proxy style `prisma+...` URL during local builds.
    if (process.env.PRISMA_ACCELERATE === 'true') {
        return base.$extends(withAccelerate())
    }

    return base
}

const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma