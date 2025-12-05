import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

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
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mb-6">Save items you love to buy later.</p>
                    <Link href="/shop">
                        <Button>Start Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <ProductCard key={item.id} product={item.product as any} />
                    ))}
                </div>
            )}
        </div>
    )
}
