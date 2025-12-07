'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'

export default function CartPage() {
    const { items, updateQuantity, removeItem, cartTotal } = useCart()
    const { t } = useLanguage()

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">{t('cart.empty')}</h1>
                <p className="text-muted-foreground mb-8">{t('cart.empty.desc')}</p>
                <Link href="/shop">
                    <Button size="lg">{t('dashboard.startShopping')}</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                            <div className="h-24 w-24 bg-muted/20 rounded-md flex items-center justify-center shrink-0 relative overflow-hidden">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl">📦</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <Link href={`/product/${item.slug}`} className="font-semibold hover:text-primary truncate block">
                                    {item.title}
                                </Link>
                                <div className="text-muted-foreground text-sm">{item.category}</div>
                                <div className="font-bold text-primary mt-1">৳{item.price}</div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center border rounded-md">
                                    <button
                                        className="p-1 hover:bg-muted"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        className="p-1 hover:bg-muted"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <button
                                    className="text-red-500 text-sm hover:underline flex items-center gap-1"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 className="h-3 w-3" /> {t('cart.remove')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-card sticky top-24">
                        <h2 className="text-xl font-bold mb-4">{t('cart.summary')}</h2>

                        <div className="space-y-2 text-sm mb-4 border-b pb-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                                <span>৳{cartTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('cart.shipping')}</span>
                                <span>৳60</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('cart.tax')} (5%)</span>
                                <span>৳{Math.round(cartTotal * 0.05)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-bold text-lg mb-6">
                            <span>{t('cart.total')}</span>
                            <span>৳{cartTotal + 60 + Math.round(cartTotal * 0.05)}</span>
                        </div>

                        <Link href="/checkout">
                            <Button className="w-full" size="lg">
                                {t('cart.checkout')} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
