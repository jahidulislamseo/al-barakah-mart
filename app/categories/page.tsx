import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowRight } from 'lucide-react'

async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { products: true }
                }
            }
        })
        return categories
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return []
    }
}

export default async function CategoriesPage() {
    const categories = await getCategories()

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-6">Browse Categories</h1>
                <p className="text-xl text-muted-foreground">
                    Explore our wide range of fresh and organic products by category.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/shop?category=${category.slug}`}
                        className="group block bg-white rounded-xl border hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                        <div className="aspect-[4/3] bg-muted/20 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                            {category.image?.startsWith('/') ? '📦' : category.image}
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {category.description || `Browse our collection of ${category.name}`}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                                    {category._count.products} Products
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">No categories found.</p>
                </div>
            )}
        </div>
    )
}
