import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const q = searchParams.get('q')
    const sort = searchParams.get('sort')

    const where: any = {}

    if (category) {
        where.category = { name: category }
    }

    if (q) {
        where.OR = [
            { title: { contains: q } },
            { description: { contains: q } },
        ]
    }

    let orderBy: any = { createdAt: 'desc' }
    if (sort === 'price_asc') orderBy = { price: 'asc' }
    if (sort === 'price_desc') orderBy = { price: 'desc' }
    if (sort === 'best_selling') orderBy = { isBestSeller: 'desc' }

    try {
        const products = await prisma.product.findMany({
            where,
            orderBy,
            include: { category: true }
        })
        return NextResponse.json(products)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await getSession()

    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { title, price, categoryId, image, description } = body

        const product = await prisma.product.create({
            data: {
                title,
                price: parseFloat(price),
                categoryId,
                image: image || '/placeholder.png',
                description,
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }
}
