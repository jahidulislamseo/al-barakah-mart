import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { OrderTimeline } from '@/components/ecommerce/OrderTimeline'

async function getOrders(email: string) {
    try {
        const orders = await prisma.order.findMany({
            where: { user: { email } },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        })
        return orders
    } catch (error) {
        return []
    }
}

export default async function DashboardPage() {
    let session = null
    try {
        session = await getSession()
    } catch (error) {
        console.error('Failed to get session:', error)
        return null
    }
    if (!session?.user?.email) return null

    const orders = await getOrders(session.user.email)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Order History</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
                    <Link href="/shop">
                        <Button>Start Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg border overflow-hidden">
                            <div className="p-4 border-b bg-gray-50 flex flex-wrap items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Order ID</p>
                                    <p className="font-mono text-sm font-medium">#{order.id.slice(-8)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Date</p>
                                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Total Amount</p>
                                    <p className="text-sm font-medium">৳{order.total}</p>
                                </div>
                            </div>

                            {/* Order Timeline */}
                            <div className="px-4 pt-2">
                                <OrderTimeline status={order.status as any} createdAt={order.createdAt.toString()} />
                            </div>

                            <div className="p-4">
                                <div className="space-y-3">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center text-lg">
                                                {item.product.image.startsWith('/') ? '📦' : item.product.image}
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
