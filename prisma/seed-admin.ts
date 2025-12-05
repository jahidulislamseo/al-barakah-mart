import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await hash('Jahidul90@', 12)
    const user = await prisma.user.upsert({
        where: { email: 'opjahidulislam@gmail.com' },
        update: { role: 'admin' }, // Ensure role is admin if user exists
        create: {
            email: 'opjahidulislam@gmail.com',
            name: 'Admin User',
            password,
            role: 'admin',
        },
    })
    console.log({ user })
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
