'use client' // Using client for interactivity (qty, add to cart)

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Star, Truck, ShieldCheck, Heart, Share2, Minus, Plus, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PRODUCTS } from '@/lib/data'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { useCart } from '@/lib/cart-context'

export default function ProductDetailsPage() {
    const { addItem } = useCart()
    const params = useParams()
    const id = params.id as string
    const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0] // Fallback if not found for demo

    const [qty, setQty] = useState(1)

    if (!product) return <div>Product not found</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* Main Image Placeholder */}
                        <div className="text-9xl">📦</div>
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
                                <span className="font-medium">{product.rating}</span>
                                <span className="text-muted-foreground">({product.reviews} reviews)</span>
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

                    <p className="text-muted-foreground leading-relaxed">
                        Experience premium quality with our fresh organic selection. Sourced directly from trusted farmers and suppliers.
                        Perfect for your daily needs with guaranteed satisfaction.
                        <br /><br />
                        • 100% Organic & Fresh<br />
                        • Halal Certified<br />
                        • Premium Quality Check
                    </p>

                    <div className="pt-4 border-t border-b py-4 space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="font-medium">Quantity:</span>
                            <div className="flex items-center border rounded-md">
                                <button
                                    className="px-3 py-1 hover:bg-muted"
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{qty}</span>
                                <button
                                    className="px-3 py-1 hover:bg-muted"
                                    onClick={() => setQty(qty + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            size="lg"
                            className="flex-1 text-lg h-12"
                            onClick={() => {
                                addItem(product, qty)
                                alert('Added to cart!')
                            }}
                        >
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="outline" className="px-6 h-12">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="ghost" className="px-6 h-12">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>

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

            {/* Description & Reviews Tabs (Simplified) */}
            <div className="mb-16">
                <div className="border-b mb-6">
                    <div className="flex gap-8">
                        <button className="border-b-2 border-primary pb-2 font-medium text-primary">Description</button>
                        <button className="text-muted-foreground pb-2 hover:text-foreground">Reviews ({product.reviews})</button>
                        <button className="text-muted-foreground pb-2 hover:text-foreground">Shipping Info</button>
                    </div>
                </div>
                <div className="prose max-w-none text-muted-foreground">
                    <p>Detailed product description will go here. It can contain HTML content, images, and specifications tables.</p>
                </div>
            </div>

            {/* Related Products */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {PRODUCTS.slice(0, 5).map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}
