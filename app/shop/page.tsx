import Link from 'next/link'
import Image from 'next/image'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { prisma } from '@/lib/prisma'

// Mock filter component
function ProductFilters() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <ul className="space-y-2 text-sm">
                    {[
                        { id: '1', name: 'Fruits & Veg', slug: 'fruits-veg', icon: '🍎' },
                        { id: '2', name: 'Meat & Fish', slug: 'meat-fish', icon: '🥩' },
                        { id: '3', name: 'Beverages', slug: 'beverages', icon: '🥤' },
                        { id: '4', name: 'Snacks', slug: 'snacks', icon: '🍪' },
                        { id: '5', name: 'Dairy', slug: 'dairy', icon: '🥛' },
                        { id: '6', name: 'Personal Care', slug: 'personal-care', icon: '🧴' },
                        { id: '7', name: 'Grocery', slug: 'grocery', icon: '🛒' },
                    ].map((cat) => (
                        <li key={cat.id}>
                            <Link href={`/shop?category=${cat.slug}`} className="text-muted-foreground hover:text-primary">
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

async function getProducts(categorySlug?: string, q?: string) {
    const where: any = {}
    if (categorySlug) where.category = { slug: categorySlug }
    if (q) where.title = { contains: q }

    try {
        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' }
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
        <div>
            {/* Shop Banner */}
            <div className="relative h-64 bg-gradient-to-r from-green-50 to-emerald-50 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/shop-banner.png"
                        alt="Shop Fresh Groceries"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-80"
                        priority
                    />
                </div>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Shop Fresh Groceries</h1>
                        <p className="text-lg text-gray-700">Discover our wide selection of organic fruits, vegetables, and daily essentials</p>
                    </div>
                </div>
            </div>

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
                                {filteredProducts.map((product: any) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No products found.</p>
                                <Link href="/shop">
                                    <Button variant="link">Clear Filters</Button>
                                </Link>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
