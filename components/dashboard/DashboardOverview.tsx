'use client'

import React from 'react'
import Link from 'next/link'
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { OrderTimeline } from '@/components/ecommerce/OrderTimeline'
import { useLanguage } from '@/lib/language-context'

interface Item {
    id: string
    quantity: number
    price: number
    product: {
        title: string
        image: string
    }
}

interface Order {
    id: string
    createdAt: Date
    total: number
    status: string
    items: Item[]
}

export function DashboardOverview({ orders }: { orders: any[] }) {
    const { t } = useLanguage()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{t('dashboard.orderHistory')}</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t('dashboard.noOrders')}</h3>
                    <p className="text-muted-foreground mb-6">{t('cart.empty.desc')}</p>
                    <Link href="/shop">
                        <Button>{t('dashboard.startShopping')}</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg border overflow-hidden">
                            <div className="p-4 border-b bg-gray-50 flex flex-wrap items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">{t('dashboard.orderId')}</p>
                                    <p className="font-mono text-sm font-medium">#{order.id.slice(-8)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">{t('dashboard.date')}</p>
                                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">{t('dashboard.totalAmount')}</p>
                                    <p className="text-sm font-medium">৳{order.total}</p>
                                </div>
                            </div>

                            {/* Order Timeline */}
                            <div className="px-4 pt-2">
                                <OrderTimeline status={order.status as any} createdAt={order.createdAt.toString()} />
                            </div>

                            <div className="p-4">
                                <div className="space-y-3">
                                    {order.items.map((item: any) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center text-lg relative overflow-hidden">
                                                {/* Simple image check - in real app use Next/Image */}
                                                {item.product.image ? (
                                                    <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                                                ) : '📦'}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{item.product.title}</p>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium text-sm">৳{item.price * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
