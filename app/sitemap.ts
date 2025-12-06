import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE_URL = 'https://al-barakah-mart.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await prisma.product.findMany({
        select: {
            slug: true,
            updatedAt: true,
        },
    })

    const categories = await prisma.category.findMany({
        select: {
            slug: true,
        },
    })

    const productUrls = products.map((product) => ({
        url: `${BASE_URL}/product/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }))

    const categoryUrls = categories.map((category) => ({
        url: `${BASE_URL}/shop?category=${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...categoryUrls,
        ...productUrls,
    ]
}
