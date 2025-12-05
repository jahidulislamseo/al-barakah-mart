"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db",
        },
    },
});
const CATEGORIES = [
    { id: '1', name: 'Fruits & Veg', icon: '🍎' },
    { id: '2', name: 'Meat & Fish', icon: '🥩' },
    { id: '3', name: 'Beverages', icon: '🥤' },
    { id: '4', name: 'Snacks', icon: '🍪' },
    { id: '5', name: 'Dairy', icon: '🥛' },
    { id: '6', name: 'Personal Care', icon: '🧴' },
];
const PRODUCTS = [
    {
        id: '1',
        title: 'Fresh Organic Apples',
        price: 250,
        originalPrice: 300,
        image: '/placeholder-apple.png',
        category: 'Fruits & Veg',
        rating: 4.8,
        reviews: 120,
        inStock: true,
        isNew: true,
    },
    {
        id: '2',
        title: 'Premium Beef Cuts (1kg)',
        price: 850,
        image: '/placeholder-beef.png',
        category: 'Meat & Fish',
        rating: 4.9,
        reviews: 85,
        inStock: true,
        isBestSeller: true,
    },
    {
        id: '3',
        title: 'Soybean Oil (5L)',
        price: 900,
        originalPrice: 950,
        image: '/placeholder-oil.png',
        category: 'Grocery', // Note: Grocery category not in CATEGORIES list above, might fail if not handled
        rating: 4.5,
        reviews: 300,
        inStock: true,
        isBestSeller: true,
    },
    {
        id: '4',
        title: 'Mila Skimmed Milk',
        price: 90,
        image: '/placeholder-milk.png',
        category: 'Dairy',
        rating: 4.6,
        reviews: 45,
        inStock: true,
    },
    {
        id: '5',
        title: 'Pringles Original',
        price: 220,
        image: '/placeholder-chips.png',
        category: 'Snacks',
        rating: 4.7,
        reviews: 200,
        inStock: true,
    },
    {
        id: '6',
        title: 'Dove Moisture Shampoo',
        price: 450,
        image: '/placeholder-shampoo.png',
        category: 'Personal Care',
        rating: 4.8,
        reviews: 150,
        inStock: true,
    },
];
async function main() {
    console.log('Start seeding ...');
    // Seed Categories
    for (const cat of CATEGORIES) {
        const category = await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: {
                name: cat.name,
                icon: cat.icon,
            },
        });
        console.log(`Created category with id: ${category.id}`);
    }
    // Seed Products
    for (const p of PRODUCTS) {
        // Find category id
        // Handle 'Grocery' case if it's missing in CATEGORIES
        let categoryName = p.category;
        if (categoryName === 'Grocery') {
            // Create Grocery category if not exists or map to something else
            // For now let's create it on the fly or skip
            // Better to create it
            const grocery = await prisma.category.upsert({
                where: { name: 'Grocery' },
                update: {},
                create: { name: 'Grocery', icon: '🛒' }
            });
            categoryName = 'Grocery';
        }
        const category = await prisma.category.findUnique({
            where: { name: categoryName },
        });
        if (!category) {
            console.warn(`Category not found for product: ${p.title}`);
            continue;
        }
        const product = await prisma.product.upsert({
            where: { id: p.id },
            update: {},
            create: {
                id: p.id,
                title: p.title,
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
        });
        console.log(`Created product with id: ${product.id}`);
    }
    console.log('Seeding finished.');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
