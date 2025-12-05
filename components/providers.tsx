'use client'

import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/lib/cart-context'
import { LanguageProvider } from '@/lib/language-context'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <LanguageProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </LanguageProvider>
        </SessionProvider>
    )
}
