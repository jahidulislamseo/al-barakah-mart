'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function register(prevState: string | undefined, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return 'Invalid fields. Failed to Register.'
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
    } catch (error) {
        return 'Database Error: Failed to Create User.'
    }

    // Login after register? Or redirect to login.
    // For now, let's just return success message or redirect manually in UI if I could, 
    // but simpler to just let user login.
    // Or I can call signIn here too.

    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Registered but failed to auto-login.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}
