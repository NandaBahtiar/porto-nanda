import { PrismaClient } from "@/generated/prisma";


// Hindari membuat banyak instance PrismaClient di development
declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;