import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Delete existing user
    await prisma.user.deleteMany({
        where: { email: 'opjahidulislam@gmail.com' }
    })

    // Create fresh admin user
    const password = await hash('Jahidul90@', 12)
    const user = await prisma.user.create({
        data: {
            email: 'opjahidulislam@gmail.com',
            name: 'Admin User',
            password,
            role: 'admin',
        },
    })
    console.log('Created admin user:', user)
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
