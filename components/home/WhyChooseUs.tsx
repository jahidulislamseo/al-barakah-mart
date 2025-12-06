'use client'

import { useLanguage } from '@/lib/language-context'
import { Award, TrendingDown, RefreshCw } from 'lucide-react'

export function WhyChooseUs() {
    const { t } = useLanguage()

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {t('why.title')}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t('why.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-14 w-14 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                            <Award className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {t('why.q1.title')}
                        </h3>
                        <p className="text-gray-600">
                            {t('why.q1.desc')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-14 w-14 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                            <TrendingDown className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {t('why.q2.title')}
                        </h3>
                        <p className="text-gray-600">
                            {t('why.q2.desc')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-14 w-14 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                            <RefreshCw className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {t('why.q3.title')}
                        </h3>
                        <p className="text-gray-600">
                            {t('why.q3.desc')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
