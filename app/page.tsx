import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { SpecialOffers } from "@/components/home/SpecialOffers"
import { Testimonials } from "@/components/home/Testimonials"
import { Newsletter } from "@/components/home/Newsletter"
import { ProductSection } from "@/components/home/ProductSection"
import { CategorySection } from "@/components/home/CategorySection"

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
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Categories Showcase */}
      <CategorySection categories={categories} />

      {/* New Arrivals */}
      <ProductSection
        titleKey="home.featured.title"
        products={newArrivals}
      />

      {/* Promo Banner */}
      <SpecialOffers />

      {/* Best Sellers */}
      <ProductSection
        titleKey="home.bestsellers.title"
        products={bestSellers}
        bgGray
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

    </div>
  )
}

