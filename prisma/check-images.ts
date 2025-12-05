import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            image: true
        }
    })

    console.log(`Found ${products.length} products.`)
    products.forEach(p => {
        console.log(`- ${p.title}: ${p.image}`)
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
