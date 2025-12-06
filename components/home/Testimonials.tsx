'use client'

import { useLanguage } from '@/lib/language-context'
import { Star, User } from 'lucide-react'

export function Testimonials() {
    const { t } = useLanguage()

    const testimonials = [
        {
            text: t('testi.1.text'),
            author: t('testi.1.author'),
        },
        {
            text: t('testi.2.text'),
            author: t('testi.2.author'),
        },
        {
            text: t('testi.3.text'),
            author: t('testi.3.author'),
        },
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    {t('testi.title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testi, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">
                                "{testi.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <User className="h-6 w-6" />
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {testi.author}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
