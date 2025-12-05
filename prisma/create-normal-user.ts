import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create a normal user
    const password = await bcrypt.hash('user123', 10)
    const user = await prisma.user.create({
        data: {
            email: 'user@albarakah.com',
            name: 'Normal User',
            password,
            role: 'user',
        },
    })

    console.log('✅ Normal user created successfully!')
    console.log('Email: user@albarakah.com')
    console.log('Password: user123')
    console.log('Role:', user.role)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('❌ Error:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
