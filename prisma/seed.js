"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data_1 = require("../lib/data");
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db",
        },
    },
});
async function main() {
    console.log('Start seeding ...');
    // Seed Categories
    for (const cat of data_1.CATEGORIES) {
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
    for (const p of data_1.PRODUCTS) {
        // Find category id
        const category = await prisma.category.findUnique({
            where: { name: p.category },
        });
        if (!category) {
            console.warn(`Category not found for product: ${p.title}`);
            continue;
        }
        const product = await prisma.product.create({
            data: {
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
            },
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
