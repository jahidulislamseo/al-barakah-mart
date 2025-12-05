import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'opjahidulislam@gmail.com'
    const password = 'Jahidul90@'

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        console.error('User not found')
        return
    }

    console.log('User found:', user)

    const isValid = await compare(password, user.password)
    console.log('Password valid:', isValid)
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
