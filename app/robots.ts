import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/dashboard/'],
        },
        sitemap: 'https://al-barakah-mart.vercel.app/sitemap.xml',
    }
}
