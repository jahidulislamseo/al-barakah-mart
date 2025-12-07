'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Truck, ShieldCheck, Check, ArrowLeft } from 'lucide-react'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductTabs } from '@/components/ecommerce/ProductTabs'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { AddToCart } from '@/app/product/[slug]/add-to-cart'
import { useLanguage } from '@/lib/language-context'

interface ProductDetailsProps {
    product: any
    relatedProducts: any[]
    reviews: any[]
    session: any
}

export function ProductDetails({ product, relatedProducts, reviews, session }: ProductDetailsProps) {
    const { t } = useLanguage()

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('product.backToShop')}
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                {/* Image Gallery */}
                <ProductGallery
                    images={product.images && product.images.length > 0 ? product.images : [product.image]}
                    title={product.title}
                    isNew={product.isNew}
                />

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{product.rating.toFixed(1)}</span>
                                <span className="text-muted-foreground">({product.reviewsCount} {t('product.reviews')})</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <Check className="h-4 w-4" /> {t('product.inStock')}
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
                                // Extract a short summary
                                const fullDesc = product.description || "Experience premium quality with our fresh organic selection.";
                                const cleanDesc = fullDesc.replace(/[#*]/g, '');
                                const summary = cleanDesc.split('\n').find((line: string) => line.trim().length > 20) || cleanDesc.slice(0, 200);
                                return summary.slice(0, 250) + (summary.length > 250 ? '...' : '');
                            })()}
                        </p>
                        <ul className="list-disc pl-4 mt-2 space-y-1">
                            <li>{t('features.fresh.title')}</li>
                            <li>{t('why.q1.title')}</li>
                            <li>{t('features.secure.title')}</li>
                        </ul>
                    </div>

                    <AddToCart product={product} />

                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4">
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-primary" /> {t('product.delivery')}
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary" /> {t('product.cod')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Description & Reviews Tabs (Interactive) */}
            <ProductTabs
                description={product.description || t('product.description')}
                reviews={reviews}
                productId={product.id}
                session={session}
            />

            {/* Related Products */}
            <div>
                <h2 className="text-2xl font-bold mb-6">{t('product.relatedProducts')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {relatedProducts.map((p: any) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}
