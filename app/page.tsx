import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ProductCard } from "@/components/ecommerce/ProductCard"
import { HeroSlideshow } from "@/components/layout/HeroSlideshow"
import { prisma } from "@/lib/prisma"
import { ArrowRight, CheckCircle, Truck, ShieldCheck, Leaf, Star, HelpCircle } from "lucide-react"

export const dynamic = 'force-dynamic'


async function getNewArrivals() {
  try {
    return await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    })
  } catch (e) { return [] }
}

async function getBestSellers() {
  try {
    // Mock logic for best sellers (e.g. random or specific category)
    return await prisma.product.findMany({
      take: 4,
      orderBy: { price: 'desc' },
      include: { category: true }
    })
  } catch (e) { return [] }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ take: 6 })
  } catch (e) { return [] }
}

export default async function Home() {
  const newArrivals = await getNewArrivals()
  const bestSellers = await getBestSellers()
  const categories = await getCategories()

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <HeroSlideshow />


      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Organic</h3>
              <p className="text-muted-foreground leading-relaxed">
                We ensure all our vegetables and fruits are 100% organic and free from harmful chemicals.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get your groceries delivered to your doorstep within 24 hours. Free shipping on orders over ৳500.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pay securely with bKash, Nagad, or Cash on Delivery. Your transaction is always safe with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find everything you need in one place</p>
            </div>
            <Link href="/categories" className="text-primary font-medium hover:underline flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="group bg-white p-6 rounded-xl border hover:shadow-md transition-all text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon || '📦'}
                </div>
                <h3 className="font-medium group-hover:text-primary transition-colors">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
            <p className="text-muted-foreground">Check out the latest additions to our store. Fresh from the farm.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Get 20% Off Your First Order</h2>
              <p className="text-lg opacity-90">Join the Al Barakah family today and experience premium quality groceries. Use code <span className="font-bold bg-white/20 px-2 py-1 rounded">WELCOME20</span> at checkout.</p>
              <Link href="/shop">
                <Button size="lg" variant="secondary" className="font-bold h-14 px-10 rounded-full mt-4">
                  Shop Now
                </Button>
              </Link>
            </div>
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <Link href="/shop" className="text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahim Ahmed", role: "Dhaka", text: "The quality of vegetables is amazing. Always fresh and delivered on time. Highly recommended!" },
              { name: "Fatima Begum", role: "Chittagong", text: "I love the organic selection. It's hard to find such genuine organic products online. Great job Al Barakah!" },
              { name: "Karim Ullah", role: "Sylhet", text: "Customer service is top-notch. They resolved my issue within minutes. Will order again." }
            ].map((review, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-2xl border hover:shadow-md transition-all">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long does delivery take?", a: "We offer same-day delivery for orders placed before 12 PM. Standard delivery is within 24 hours." },
              { q: "Is the food really organic?", a: "Yes! We source directly from certified organic farmers and conduct strict quality checks." },
              { q: "What payment methods do you accept?", a: "We accept bKash, Nagad, Credit Cards, and Cash on Delivery." },
              { q: "Can I return products?", a: "Yes, if you are not satisfied with the quality, you can return it at the time of delivery." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" /> {faq.q}
                </h3>
                <p className="text-muted-foreground pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
