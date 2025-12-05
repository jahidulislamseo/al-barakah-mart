'use client'

import { useState } from 'react'
import { Minus, Plus, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/lib/cart-context'

export function AddToCart({ product }: { product: any }) {
    const { addItem } = useCart()
    const [qty, setQty] = useState(1)

    return (
        <>
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
                        // Simple feedback without alert
                        const btn = document.getElementById('add-to-cart-btn')
                        if (btn) {
                            btn.textContent = 'Added!'
                            setTimeout(() => btn.textContent = 'Add to Cart', 2000)
                        }
                    }}
                    id="add-to-cart-btn"
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
        </>
    )
}
