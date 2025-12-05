'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function ProfileForm({ user }: { user: any }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess('')

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            // email: formData.get('email'), // Email update usually requires verification, skipping for now
        }

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error('Failed to update profile')

            setSuccess('Profile updated successfully')
            router.refresh()
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
            {success && <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md">{success}</div>}

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" name="email" defaultValue={user.email} disabled className="bg-gray-50" />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input id="name" name="name" defaultValue={user.name || ''} required />
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    )
}
