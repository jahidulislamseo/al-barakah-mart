'use client'

import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function SpecialOffers() {
    const { t } = useLanguage()

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl group">
                    {/* Background Image Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
                        style={{
                            backgroundImage: "url('/images/promos/fresh-banner.png')", // Using the generated banner
                        }}
                    />
                    {/* Dark Overlay for readability */}
                    <div className="absolute inset-0 bg-black/50 z-0" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold animate-fade-in-up">
                            {t('offer.title')}
                        </h2>
                        <p className="text-2xl font-light">
                            {t('offer.subtitle')}
                        </p>

                        <div className="py-4">
                            <span className="inline-block border-2 border-dashed border-white/40 bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-xl font-mono tracking-wider">
                                {t('offer.code')}
                            </span>
                        </div>

                        <Link href="/shop">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-10 rounded-full shadow-lg hover:shadow-green-500/30 transition-all mt-4">
                                {t('offer.cta')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
