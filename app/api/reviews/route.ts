import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { productId, rating, comment } = body

        if (!productId || !rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const review = await prisma.review.create({
            data: {
                productId,
                userId: user.id,
                rating: Number(rating),
                comment,
            }
        })

        // Update product rating and reviews count
        const productReviews = await prisma.review.findMany({
            where: { productId }
        })

        const totalRating = productReviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0)
        const averageRating = totalRating / productReviews.length

        await prisma.product.update({
            where: { id: productId },
            data: {
                rating: averageRating,
                reviewsCount: productReviews.length
            }
        })

        return NextResponse.json(review)
    } catch (error) {
        console.error('Error creating review:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
