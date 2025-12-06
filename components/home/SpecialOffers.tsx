'use client'

import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'

export function SpecialOffers() {
    const { t } = useLanguage()

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="bg-green-600 rounded-2xl overflow-hidden relative">
                    <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-16 relative z-10">
                        <div className="text-white space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold">
                                {t('offer.title')}
                            </h2>
                            <p className="text-xl text-green-100">
                                {t('offer.subtitle')}
                            </p>
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/30 text-lg font-mono">
                                {t('offer.code')}
                            </div>
                            <div>
                                <Link
                                    href="/shop"
                                    className="inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                                >
                                    {t('offer.cta')}
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block relative h-64">
                            {/* Detailed vegetable image illustration could go here */}
                            <div className="absolute inset-0 bg-[url('/vegetables_pattern.png')] opacity-30 bg-contain bg-no-repeat bg-center"></div>
                        </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500 rounded-full opacity-50"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-500 rounded-full opacity-50"></div>
                </div>
            </div>
        </section>
    )
}
