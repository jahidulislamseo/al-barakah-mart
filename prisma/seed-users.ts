import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding users...')

    // 1. Admin User
    const adminPassword = await hash('Jahidul90@', 12)
    const admin = await prisma.user.upsert({
        where: { email: 'opjahidulislam@gmail.com' },
        update: {
            role: 'admin',
            password: adminPassword
        },
        create: {
            email: 'opjahidulislam@gmail.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'admin',
        },
    })
    console.log('✅ Admin user ready:', admin.email)

    // 2. Regular User
    const userPassword = await hash('user1234', 12)
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {
            role: 'user',
            password: userPassword
        },
        create: {
            email: 'user@example.com',
            name: 'Test User',
            password: userPassword,
            role: 'user',
        },
    })
    console.log('✅ Regular user ready:', user.email)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
