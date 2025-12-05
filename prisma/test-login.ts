import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testLogin() {
    const email = 'admin@albarakah.com'
    const password = 'admin123'

    console.log('🔍 Testing login for:', email)

    // Get user from database
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        console.log('❌ User not found in database')
        return
    }

    console.log('✅ User found:', {
        email: user.email,
        role: user.role,
        hasPassword: !!user.password
    })

    // Test password comparison
    const passwordsMatch = await bcrypt.compare(password, user.password)

    console.log('🔑 Password comparison result:', passwordsMatch)

    if (passwordsMatch) {
        console.log('✅ LOGIN SHOULD WORK!')
    } else {
        console.log('❌ PASSWORD DOES NOT MATCH')
        console.log('Stored hash:', user.password.substring(0, 20) + '...')
    }
}

testLogin()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('Error:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
