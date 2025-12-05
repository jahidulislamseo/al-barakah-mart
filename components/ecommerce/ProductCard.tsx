'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Product } from '@/lib/data'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0

    return (
        <Card className="group relative overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {product.isNew && <Badge>New</Badge>}
                {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-2 right-2 z-10 p-2 rounded-full bg-background/80 text-muted-foreground hover:text-red-500 hover:bg-background transition-colors opacity-0 group-hover:opacity-100">
                <Heart className="h-4 w-4" />
            </button>

            {/* Image Area */}
            <Link href={`/product/${product.id}`}>
                <div className="aspect-square relative bg-muted/20">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gray-100 text-gray-300">
                        📦
                    </div>
                </div>
            </Link>

            <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{product.title}</h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="font-bold text-lg text-primary">৳{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">৳{product.originalPrice}</span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full gap-2"
                    variant="secondary"
                    onClick={() => addItem(product)}
                >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}
