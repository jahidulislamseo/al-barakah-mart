import { prisma } from '@/lib/prisma'
import { ProductForm } from './product-form'

async function getCategories() {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    })
    return categories
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
