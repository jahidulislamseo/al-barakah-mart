'use client'

import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CategorySectionProps {
    categories: any[]
}

export function CategorySection({ categories }: CategorySectionProps) {
    const { t } = useLanguage()

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">
                            {t('home.categories.title')}
                        </h2>
                        <p className="text-muted-foreground">{t('home.categories.subtitle')}</p>
                    </div>
                    <Link href="/categories" className="text-green-600 font-medium hover:underline flex items-center">
                        {t('home.viewAll')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat) => (
                        <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="group bg-white p-6 rounded-xl border hover:shadow-md transition-all text-center">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {cat.icon || '📦'}
                            </div>
                            <h3 className="font-medium group-hover:text-green-600 transition-colors">{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
