import { prisma } from '@/lib/prisma'
import { ShopContent } from '@/components/ecommerce/ShopContent'

async function getProducts(categorySlug?: string, q?: string) {
    const where: any = {}
    if (categorySlug) where.category = { slug: categorySlug }
    if (q) where.title = { contains: q, mode: 'insensitive' }

    try {
        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        })
        return products
    } catch (error) {
        return []
    }
}

export default async function ShopPage(props: {
    searchParams: Promise<{ category?: string; q?: string }>
}) {
    const searchParams = await props.searchParams;
    const categoryFilter = searchParams.category
    const q = searchParams.q

    const filteredProducts = await getProducts(categoryFilter, q)

    return (
        <ShopContent
            products={filteredProducts}
            categoryFilter={categoryFilter}
            q={q}
        />
    )
}
