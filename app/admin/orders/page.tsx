import { prisma } from '@/lib/prisma'
import { OrderStatus } from './order-status'
import { Badge } from '@/components/ui/Badge'

async function getOrders() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true, email: true } },
            items: true
        }
    })
    return orders
}

export default async function AdminOrdersPage() {
    const orders = await getOrders()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Orders</h1>

            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 font-medium">Order ID</th>
                            <th className="px-4 py-3 font-medium">Customer</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Total</th>
                            <th className="px-4 py-3 font-medium">Items</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-mono">#{order.id.slice(-8)}</td>
                                <td className="px-4 py-3">
                                    <div className="font-medium">{order.user?.name || 'Guest'}</div>
                                    <div className="text-xs text-muted-foreground">{order.user?.email}</div>
                                </td>
                                <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-3 font-medium">৳{order.total}</td>
                                <td className="px-4 py-3">{order.items.length} items</td>
                                <td className="px-4 py-3">
                                    <OrderStatus orderId={order.id} currentStatus={order.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">No orders found.</div>
                )}
            </div>
        </div>
    )
}
