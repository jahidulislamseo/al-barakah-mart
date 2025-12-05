import { prisma } from './lib/prisma'

async function main() {
    try {
        const user = await prisma.user.findFirst({
            where: { email: 'opjahidulislam@gmail.com' }
        })
        console.log('User found:', user)
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
