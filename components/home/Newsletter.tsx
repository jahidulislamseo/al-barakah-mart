'use client'

import { useLanguage } from '@/lib/language-context'
import { Send } from 'lucide-react'

export function Newsletter() {
    const { t } = useLanguage()

    return (
        <section className="py-16 bg-green-900 text-white">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">
                        {t('news.title')}
                    </h2>
                    <p className="text-green-100 mb-8 text-lg">
                        {t('news.subtitle')}
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder={t('news.placeholder')}
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <Send className="h-4 w-4" />
                            {t('news.button')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
