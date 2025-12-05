import { prisma } from '@/lib/prisma'
import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react'

async function getStats() {
    const totalOrders = await prisma.order.count()
    const totalProducts = await prisma.product.count()
    const totalUsers = await prisma.user.count()

    const orders = await prisma.order.findMany({
        select: { total: true }
    })
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0)

    return {
        totalOrders,
        totalProducts,
        totalUsers,
        totalSales
    }
}

export default async function AdminDashboard() {
    const stats = await getStats()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Sales</h3>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">৳{stats.totalSales.toLocaleString()}</div>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.totalOrders}</div>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Products</h3>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </div>
            </div>
        </div>
    )
}
