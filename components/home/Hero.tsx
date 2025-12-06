'use client'

import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
    const { t } = useLanguage()

    return (
        <section className="relative bg-green-50 z-0">
            <div className="container mx-auto px-4 py-20 lg:py-32">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                        {t('home.hero.title')}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        {t('home.hero.subtitle')}
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        {t('home.hero.cta')}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>

            {/* Background pattern or image could go here */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-green-600">
                    <path fill="#16A34A" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.6C90.8,-34.1,96.9,-19.2,95.8,-4.9C94.7,9.5,86.3,23.2,76.4,36.2C66.5,49.1,55.1,61.3,42.1,69.5C29.1,77.7,14.5,81.9,-0.6,82.9C-15.7,84,-31.4,81.9,-45.3,73.8C-59.2,65.7,-71.4,51.6,-79.6,35.6C-87.7,19.6,-91.9,1.7,-88.4,-14.8C-84.9,-31.3,-73.7,-46.4,-59.8,-58.2C-45.9,-70,-29.3,-78.6,-13.4,-81.4C2.5,-84.2,20.4,-81.2,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
            </div>
        </section>
    )
}
