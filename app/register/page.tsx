'use client'

import { useState } from 'react'
import { register } from '@/lib/actions'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            // 1. Register user
            const result = await register(formData)

            if (result?.error) {
                setError(result.error)
                setLoading(false)
                return
            }

            // 2. Login user
            const signInResult = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (signInResult?.error) {
                setError('Registration successful but failed to auto-login. Please login manually.')
                setLoading(false)
                router.push('/login')
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error) {
            setError('Something went wrong')
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create a new account
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="-space-y-px rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Register'}
                        </Button>
                    </div>
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
