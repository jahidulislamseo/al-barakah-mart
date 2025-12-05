import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding debug ...')

    const category = await prisma.category.upsert({
        where: { name: 'Debug Category' },
        update: {},
        create: {
            name: 'Debug Category',
            icon: '🐛',
        },
    })
    console.log(`Created category: ${category.name}`)

    console.log('Seeding finished.')
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
