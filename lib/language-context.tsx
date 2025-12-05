'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, TranslationKey, getTranslation } from './translations'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('bn') // Default to Bengali

    useEffect(() => {
        // Check localStorage for saved language preference
        const saved = localStorage.getItem('language') as Language
        if (saved && (saved === 'en' || saved === 'bn')) {
            setLanguageState(saved)
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language.toLowerCase()
            if (browserLang.startsWith('bn')) {
                setLanguageState('bn')
            } else {
                setLanguageState('en')
            }
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem('language', lang)
    }

    const t = (key: TranslationKey) => getTranslation(key, language)

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider')
    }
    return context
}
