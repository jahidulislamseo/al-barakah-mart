'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { useLanguage } from '@/lib/language-context'
import { useState } from 'react'

interface ShopContentProps {
    products: any[]
    categoryFilter?: string
    q?: string
}

export function ShopContent({ products, categoryFilter, q }: ShopContentProps) {
    const { t } = useLanguage()
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

    // Helper to check if a category is active
    const isCategoryActive = (slug: string) => categoryFilter === slug

    const categories = [
        { id: '1', nameKey: 'shop.category.fruits', slug: 'fruits-veg', icon: '🍎' },
        { id: '2', nameKey: 'shop.category.meat', slug: 'meat-fish', icon: '🥩' },
        { id: '3', nameKey: 'shop.category.beverages', slug: 'beverages', icon: '🥤' },
        { id: '4', nameKey: 'shop.category.snacks', slug: 'snacks', icon: '🍪' },
        { id: '5', nameKey: 'shop.category.dairy', slug: 'dairy', icon: '🥛' },
        { id: '6', nameKey: 'shop.category.personal', slug: 'personal-care', icon: '🧴' },
        { id: '7', nameKey: 'shop.category.grocery', slug: 'grocery', icon: '🛒' },
    ]

    return (
        <div>
            {/* Shop Banner */}
            <div className="relative h-64 bg-gradient-to-r from-green-50 to-emerald-50 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/shop-banner.png"
                        alt="Shop Fresh Groceries"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-80"
                        priority
                    />
                </div>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t('shop.title')}</h1>
                        <p className="text-lg text-gray-700">{t('shop.subtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Mobile Filter Toggle */}
                <div className="flex items-center justify-between md:hidden mb-6">
                    <h1 className="text-2xl font-bold">{t('header.shop')}</h1>
                    <Button variant="outline" size="sm" onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}>
                        <Filter className="mr-2 h-4 w-4" /> {t('shop.filters')}
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className={`w-full md:w-64 shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-3">{t('shop.categories')}</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link
                                            href="/shop"
                                            className={`hover:text-primary ${!categoryFilter ? 'font-bold text-primary' : 'text-muted-foreground'}`}
                                        >
                                            {t('home.viewAll')}
                                        </Link>
                                    </li>
                                    {categories.map((cat: any) => (
                                        <li key={cat.id}>
                                            <Link
                                                href={`/shop?category=${cat.slug}`}
                                                className={`hover:text-primary flex items-center gap-2 ${isCategoryActive(cat.slug) ? 'font-bold text-primary' : 'text-muted-foreground'}`}
                                            >
                                                <span>{cat.icon}</span>
                                                {t(cat.nameKey)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Range - Placeholder for now as it doesn't have logic yet */}
                            <div>
                                <h3 className="font-semibold mb-3">{t('shop.priceRange')}</h3>
                                <div className="flex items-center gap-2">
                                    <Input type="number" placeholder="Min" className="w-20" />
                                    <span>-</span>
                                    <Input type="number" placeholder="Max" className="w-20" />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">{t('shop.sortBy')}</h3>
                                <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                                    <option>{t('shop.newest')}</option>
                                    <option>{t('shop.priceLowHigh')}</option>
                                    <option>{t('shop.priceHighLow')}</option>
                                    <option>{t('shop.bestSelling')}</option>
                                </select>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map((product: any) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">{t('shop.noProducts')}</p>
                                <Link href="/shop">
                                    <Button variant="link">{t('shop.clearFilters')}</Button>
                                </Link>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
