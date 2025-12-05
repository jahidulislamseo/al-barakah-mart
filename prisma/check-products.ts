import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const count = await prisma.product.count()
        console.log(`Total products in DB: ${count}`)

        if (count > 0) {
            const products = await prisma.product.findMany()
            products.forEach(p => console.log(`${p.title}: ${p.image}`))
        }
    } catch (e) {
        console.error('Error querying DB:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
