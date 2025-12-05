import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const wishlist = await prisma.wishlist.findMany({
            where: { user: { email: session.user.email } },
            include: { product: true },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(wishlist)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { productId } = await req.json()

        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        const wishlistItem = await prisma.wishlist.create({
            data: {
                userId: user.id,
                productId
            }
        })

        return NextResponse.json(wishlistItem)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const productId = searchParams.get('productId')

        if (!productId) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        await prisma.wishlist.deleteMany({
            where: {
                userId: user.id,
                productId
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
