import { notFound } from 'next/navigation'
import { Star, Truck, ShieldCheck, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { prisma } from '@/lib/prisma'
import { AddToCart } from './add-to-cart'
import { ProductCard } from '@/components/ecommerce/ProductCard'

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
import { getSession } from '@/lib/auth'
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
        <div className="container mx-auto px-4 py-8">
            {/* ... (existing product details) ... */}

            <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* Main Image */}
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="text-9xl">📦</div>
                        )}
                        {product.isNew && <Badge className="absolute top-4 left-4 text-sm px-3 py-1">New Arrival</Badge>}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-muted/20 rounded-md cursor-pointer hover:ring-2 hover:ring-primary"></div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{product.rating.toFixed(1)}</span>
                                <span className="text-muted-foreground">({product.reviewsCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <Check className="h-4 w-4" /> In Stock
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold text-primary">৳{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xl text-muted-foreground line-through mb-1">৳{product.originalPrice}</span>
                        )}
                    </div>

                    <div className="prose prose-sm text-gray-600">
                        <p>
                            {(() => {
                                // Extract a short summary: 
                                // 1. Remove markdown headers (#, ##)
                                // 2. Take the first paragraph or first 200 chars
                                const fullDesc = product.description || "Experience premium quality with our fresh organic selection. Sourced directly from trusted farmers and suppliers. Perfect for your daily needs with guaranteed satisfaction.";
                                const cleanDesc = fullDesc.replace(/[#*]/g, '');
                                const summary = cleanDesc.split('\n').find(line => line.trim().length > 20) || cleanDesc.slice(0, 200);
                                return summary.slice(0, 250) + (summary.length > 250 ? '...' : '');
                            })()}
                        </p>
                        <ul className="list-disc pl-4 mt-2 space-y-1">
                            <li>100% Organic & Fresh</li>
                            <li>Halal Certified</li>
                            <li>Premium Quality Check</li>
                        </ul>
                    </div>

                    <AddToCart product={product} />

                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4">
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-primary" /> Delivery in 24 Hours
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary" /> Cash on Delivery Available
                        </div>
                    </div>
                </div>
            </div>

            {/* Description & Reviews Tabs (Interactive) */}
            <ProductTabs
                description={product.description || "Experience premium quality..."}
                reviews={reviews}
                productId={product.id}
                session={session}
            />

            {/* Related Products */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {relatedProducts.map((p: any) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}
