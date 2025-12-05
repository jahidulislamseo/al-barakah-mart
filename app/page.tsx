import Link from 'next/link'
import { ArrowRight, ChevronRight, Truck, ShieldCheck, Clock, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

export default function Home() {
  const newArrivals = PRODUCTS.filter(p => p.isNew)
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller || p.rating > 4.7)

  return (
    <div className="bg-background min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative bg-green-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide">
              Organic & Fresh
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Premium Quality <br />
              <span className="text-primary">Groceries</span> Delivered
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Shop from Al Barakah Mart for specific daily needs. Fresh vegetables, organic fruits, proteins and more.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="rounded-full text-lg px-8">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-xs text-muted-foreground">On orders over ৳1000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-xs text-muted-foreground">bKash, Nagad, Cards</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-xs text-muted-foreground">Within 24 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-xs text-muted-foreground">Call us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          <Button variant="ghost" className="text-primary">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.name}`}>
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white border hover:border-primary hover:shadow-lg transition-all cursor-pointer group">
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="font-medium group-hover:text-primary">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <Link href="/shop">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Ramadan Special Offer!</h2>
            <p className="text-lg opacity-90 mb-6">Get flat 20% discount on all dairy and organic products. Limited time offer.</p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Grab Deal
            </Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Best Sellers</h2>
          <Link href="/shop?sort=best_selling">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
