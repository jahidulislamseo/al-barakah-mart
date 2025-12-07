import { notFound } from 'next/navigation'
import { Star, Truck, ShieldCheck, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { ProductDetails } from '@/components/product/ProductDetails'
import { getSession } from '@/lib/auth'

async function getProduct(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: { category: true }
        })
        return product
    } catch (error) {
        return null
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        return {
            title: 'Product Not Found | Al Barakah Mart'
        }
    }

    return {
        title: `${product.title} | Al Barakah Mart`,
        description: product.description?.substring(0, 160) || `Buy ${product.title} online at Al Barakah Mart. Fresh organic quality guaranteed.`,
        openGraph: {
            images: product.image ? [product.image] : [],
            title: product.title,
            description: product.description?.substring(0, 160),
            url: `https://al-barakah-mart.vercel.app/product/${slug}`,
            type: 'website'
        }
    }
}

async function getRelatedProducts(categoryId: string, currentId: string) {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId,
                NOT: { id: currentId }
            },
            take: 5
        })
        return products
    } catch (error) {
        return []
    }
}

// Removed ReviewForm import as it is now in ProductTabs
import { ProductTabs } from '@/components/ecommerce/ProductTabs'

// ... (existing imports)

// Helper to get reviews
async function getReviews(productId: string) {
    try {
        const reviews = await prisma.review.findMany({
            where: { productId },
            include: { user: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        })
        return reviews
    } catch (error) {
        return []
    }
}

export default async function ProductDetailsPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const product = await getProduct(params.slug)
    if (!product) notFound()

    const relatedProducts = await getRelatedProducts(product.categoryId, product.id)
    const reviews = await getReviews(product.id)
    let session = null
    try {
        session = await getSession()
    } catch (error) {
        console.error('Failed to get session in product page:', error)
        session = null
    }

    return (
        <ProductDetails
            product={product}
            relatedProducts={relatedProducts}
            reviews={reviews}
            session={session}
        />
    )
}
