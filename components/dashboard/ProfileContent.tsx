'use client'

import React from 'react'
import { ProfileForm } from '@/app/dashboard/profile/profile-form'
import { useLanguage } from '@/lib/language-context'

interface ProfileContentProps {
    user: any
}

export function ProfileContent({ user }: ProfileContentProps) {
    const { t } = useLanguage()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{t('dashboard.profile')}</h1>
            <div className="bg-white p-6 rounded-lg border max-w-2xl">
                <ProfileForm user={user} />
            </div>
        </div>
    )
}
