import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const session = await getSession()
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const orders = await prisma.order.findMany({
            where: { user: { email: session.user.email } },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await getSession()
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { items, total, address, phone, paymentMethod } = body

        // Verify user exists
        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        const order = await prisma.order.create({
            data: {
                userId: user.id,
                total,
                address,
                phone,
                paymentMethod,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }
}
