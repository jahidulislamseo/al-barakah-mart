'use client'

import { useLanguage } from '@/lib/language-context'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { Product } from '@/lib/data' // Assuming this type is available, or use implicit
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Explicitly defining basic structure if imported type is complex
interface ProductSectionProps {
    titleKey: string
    subTitleKey?: string
    products: any[] // Using any to avoid strict type conflicts with Prisma types vs definitions
    bgGray?: boolean
}

export function ProductSection({ titleKey, subTitleKey, products, bgGray = false }: ProductSectionProps) {
    const { t } = useLanguage()

    return (
        <section className={`py-20 ${bgGray ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold mb-2">
                            {/* Safe access to nested keys via t() */}
                            {t(titleKey as any)}
                        </h2>
                        {subTitleKey && (
                            <p className="text-muted-foreground">
                                {t(subTitleKey as any)}
                            </p>
                        )}
                    </div>
                    <Link
                        href="/shop"
                        className="text-green-600 font-medium hover:underline flex items-center bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors"
                    >
                        {t('home.viewAll')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
