'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

export default function LoginPage() {
    const router = useRouter()
    const { t } = useLanguage()
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
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                if (result.error === 'CredentialsSignin') {
                    setError('Invalid email or password')
                } else {
                    setError('Authentication failed: ' + result.error)
                }
                setLoading(false)
            } else if (!result?.ok) {
                setError('Login failed. Please try again.')
                setLoading(false)
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error) {
            setError('Something went wrong. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        {t('auth.login.title')}
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">
                                {t('auth.login.email')}
                            </label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder={t('auth.login.email')}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {t('auth.login.password')}
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder={t('auth.login.password')}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/register" className="font-medium text-primary hover:text-primary/90">
                                {t('auth.login.noAccount')} {t('auth.login.register')}
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? t('common.loading') : t('auth.login.submit')}
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
