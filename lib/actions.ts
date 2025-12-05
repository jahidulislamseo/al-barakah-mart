'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function register(formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return { error: 'Invalid fields. Failed to Register.' }
    }

    const { name, email, password } = validatedFields.data

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
        return { success: true }
    } catch (error) {
        if ((error as any).code === 'P2002') {
            return { error: 'User already exists with this email.' }
        }
        return { error: 'Database Error: Failed to Create User.' }
    }
}
