import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'


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
        <DashboardOverview orders={orders} />
    )
}
