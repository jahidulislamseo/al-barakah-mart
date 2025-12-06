import { prisma } from '@/lib/prisma'
import { Plus, Edit } from 'lucide-react'
import { DeleteProductButton } from './product-actions'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

import { Prisma } from '@prisma/client'

type ProductWithCategory = Prisma.ProductGetPayload<{
    include: { category: true }
}>

async function getProducts() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    })
    return products
}

export default async function AdminProductsPage() {
    const products = await getProducts()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 font-medium">Image</th>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Category</th>
                            <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">Stock</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((product: ProductWithCategory) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-lg">
                                        {product.image.startsWith('/') ? '📦' : product.image}
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium">{product.title}</td>
                                <td className="px-4 py-3">
                                    <Badge variant="secondary">{product.category.name}</Badge>
                                </td>
                                <td className="px-4 py-3">৳{product.price}</td>
                                <td className="px-4 py-3">
                                    {product.inStock ? (
                                        <span className="text-green-600 font-medium">In Stock</span>
                                    ) : (
                                        <span className="text-red-600 font-medium">Out of Stock</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <DeleteProductButton productId={product.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
