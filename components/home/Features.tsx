'use client'

import { useLanguage } from '@/lib/language-context'
import { Leaf, Truck, Headset, ShieldCheck } from 'lucide-react'

export function Features() {
    const { t } = useLanguage()

    const features = [
        {
            icon: Leaf,
            title: t('features.fresh.title'),
            desc: t('features.fresh.desc'),
        },
        {
            icon: Truck,
            title: t('features.delivery.title'),
            desc: t('features.delivery.desc'),
        },
        {
            icon: Headset,
            title: t('features.support.title'),
            desc: t('features.support.desc'),
        },
        {
            icon: ShieldCheck,
            title: t('features.secure.title'),
            desc: t('features.secure.desc'),
        },
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-green-50/50 rounded-xl hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
