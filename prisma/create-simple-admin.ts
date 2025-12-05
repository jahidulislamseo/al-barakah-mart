import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Delete all existing users first
    await prisma.user.deleteMany({})

    // Create a simple admin user with password "admin123"
    const password = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.create({
        data: {
            email: 'admin@albarakah.com',
            name: 'Admin',
            password,
            role: 'admin',
        },
    })

    console.log('✅ Admin user created successfully!')
    console.log('Email: admin@albarakah.com')
    console.log('Password: admin123')
    console.log('Role:', admin.role)
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
