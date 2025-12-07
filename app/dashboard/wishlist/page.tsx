import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { WishlistContent } from '@/components/dashboard/WishlistContent'

async function getWishlist(email: string) {
    try {
        const wishlist = await prisma.wishlist.findMany({
            where: { user: { email } },
            include: {
                product: {
                    include: {
                        category: true,
                        reviews: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        })
        return wishlist
    } catch (error) {
        return []
    }
}

export default async function WishlistPage() {
    let session = null
    try {
        session = await getSession()
    } catch (error) {
        console.error('Failed to get session:', error)
        return null
    }
    if (!session?.user?.email) return null

    const wishlistItems = await getWishlist(session.user.email)

    return (
        <WishlistContent wishlistItems={wishlistItems} />
    )
}
