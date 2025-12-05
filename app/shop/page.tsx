import { Suspense } from 'react'
import Link from 'next/link'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

// Mock filter component
function ProductFilters() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <ul className="space-y-2 text-sm">
                    {CATEGORIES.map((cat) => (
                        <li key={cat.id}>
                            <Link href={`/shop?category=${cat.name}`} className="text-muted-foreground hover:text-primary">
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                    <Input type="number" placeholder="Min" className="w-20" />
                    <span>-</span>
                    <Input type="number" placeholder="Max" className="w-20" />
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-3">Sort By</h3>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Best Selling</option>
                </select>
            </div>
        </div>
    )
}

export default function ShopPage({
    searchParams,
}: {
    searchParams: { category?: string; q?: string }
}) {
    const categoryFilter = searchParams.category

    // Simple client-side filtering logic for mock
    const filteredProducts = PRODUCTS.filter(p => {
        if (categoryFilter && p.category !== categoryFilter) return false
        return true
    })

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between md:hidden mb-6">
                <h1 className="text-2xl font-bold">Shop</h1>
                <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 hidden md:block shrink-0">
                    <ProductFilters />
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No products found.</p>
                            <Button variant="link" onClick={() => window.location.href = '/shop'}>Clear Filters</Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
