'use client'

import React from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { useLanguage } from '@/lib/language-context'

interface WishlistContentProps {
    wishlistItems: any[]
}

export function WishlistContent({ wishlistItems }: WishlistContentProps) {
    const { t } = useLanguage()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{t('dashboard.wishlist')}</h1>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t('cart.empty')}</h3>
                    <p className="text-muted-foreground mb-6">{t('cart.empty.desc')}</p>
                    <Link href="/shop">
                        <Button>{t('dashboard.startShopping')}</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <ProductCard key={item.id} product={item.product} />
                    ))}
                </div>
            )}
        </div>
    )
}
