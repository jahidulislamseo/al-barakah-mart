import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Update the user with email opjahidulislam@gmail.com to be admin
    const user = await prisma.user.updateMany({
        where: { email: 'opjahidulislam@gmail.com' },
        data: { role: 'admin' }
    })
    console.log('Updated user to admin:', user)
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
