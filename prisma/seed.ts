import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CATEGORIES = [
    { name: 'Fruits & Veg', icon: '🍎' },
    { name: 'Meat & Fish', icon: '🥩' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Snacks', icon: '🍪' },
    { name: 'Dairy', icon: '🥛' },
    { name: 'Personal Care', icon: '🧴' },
    { name: 'Grocery', icon: '🛒' },
]

const PRODUCTS = [
    {
        title: 'Fresh Organic Apples',
        slug: 'fresh-organic-apples',
        price: 250,
        originalPrice: 300,
        image: 'https://placehold.co/600x400?text=Apples',
        category: 'Fruits & Veg',
        rating: 4.8,
        reviews: 120,
        inStock: true,
        isNew: true,
    },
    {
        title: 'Premium Beef Cuts (1kg)',
        slug: 'premium-beef-cuts',
        price: 850,
        image: 'https://placehold.co/600x400?text=Beef',
        category: 'Meat & Fish',
        rating: 4.9,
        reviews: 85,
        inStock: true,
        isBestSeller: true,
    },
    {
        title: 'Soybean Oil (5L)',
        slug: 'soybean-oil-5l',
        price: 900,
        originalPrice: 950,
        image: 'https://placehold.co/600x400?text=Soybean+Oil',
        category: 'Grocery',
        rating: 4.5,
        reviews: 300,
        inStock: true,
        isBestSeller: true,
    },
    {
        title: 'Mila Skimmed Milk',
        slug: 'mila-skimmed-milk',
        price: 90,
        image: 'https://placehold.co/600x400?text=Milk',
        category: 'Dairy',
        rating: 4.6,
        reviews: 45,
        inStock: true,
    },
    {
        title: 'Pringles Original',
        slug: 'pringles-original',
        price: 220,
        image: 'https://placehold.co/600x400?text=Pringles',
        category: 'Snacks',
        rating: 4.7,
        reviews: 200,
        inStock: true,
    },
    {
        title: 'Dove Moisture Shampoo',
        slug: 'dove-moisture-shampoo',
        price: 450,
        image: 'https://placehold.co/600x400?text=Shampoo',
        category: 'Personal Care',
        rating: 4.8,
        reviews: 150,
        inStock: true,
    },
]

async function main() {
    console.log('Start seeding ...')

    // Seed Categories
    for (const cat of CATEGORIES) {
        const category = await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: {
                name: cat.name,
                slug: cat.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
                icon: cat.icon,
            },
        })
        console.log(`Created category with id: ${category.id}`)
    }

    // Seed Products
    for (const p of PRODUCTS) {
        const category = await prisma.category.findUnique({
            where: { name: p.category },
        })

        if (!category) {
            console.warn(`Category not found for product: ${p.title}`)
            continue
        }

        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {
                image: p.image,
                price: p.price,
                originalPrice: p.originalPrice,
                rating: p.rating,
                reviewsCount: p.reviews,
                inStock: p.inStock,
                isNew: p.isNew || false,
                isBestSeller: p.isBestSeller || false,
                categoryId: category.id,
            },
            create: {
                title: p.title,
                slug: p.slug,
                price: p.price,
                originalPrice: p.originalPrice,
                image: p.image,
                rating: p.rating,
                reviewsCount: p.reviews,
                inStock: p.inStock,
                isNew: p.isNew || false,
                isBestSeller: p.isBestSeller || false,
                categoryId: category.id,
            }
        })
        console.log(`Created/Updated product with id: ${product.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
