import { prisma } from '@/lib/prisma'
import { ProductForm } from './product-form'

export const dynamic = 'force-dynamic'

async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        })
        return categories
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return []
    }
}

export default async function NewProductPage() {
    const categories = await getCategories()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Add New Product</h1>
            <ProductForm categories={categories} />
        </div>
    )
}
