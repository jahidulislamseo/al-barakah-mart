'use client'

import { useLanguage } from '@/lib/language-context'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'bn')}
                className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
            </select>
        </div>
    )
}
