import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
    {
        name: 'Jaggery (গুড়)',
        icon: '🍯',
        products: [
            // 1. খেজুরের গুড়
            { title: 'Patali Gur (পাতালি গুড়)', price: 350, image: 'https://placehold.co/600x400?text=Patali+Gur' },
            { title: 'Liquid Date Jaggery (লিকুইড গুড়)', price: 400, image: 'https://placehold.co/600x400?text=Liquid+Gur' },
            { title: 'Piri Gur (পিঁড়ি গুড়)', price: 300, image: 'https://placehold.co/600x400?text=Piri+Gur' },
            { title: 'Jhola Gur (ঝোলা গুড়)', price: 380, image: 'https://placehold.co/600x400?text=Jhola+Gur' },
            { title: 'Deshi Date Gur (দেশি খেজুর গুড়)', price: 450, image: 'https://placehold.co/600x400?text=Deshi+Gur' },
            { title: 'Organic Date Gur (অর্গানিক খেজুর গুড়)', price: 500, image: 'https://placehold.co/600x400?text=Organic+Gur' },
            // 2. আখের গুড়
            { title: 'Red Sugarcane Gur (লাল আখের গুড়)', price: 150, image: 'https://placehold.co/600x400?text=Red+Sugarcane+Gur' },
            { title: 'White Sugarcane Gur (সাদা আখের গুড়)', price: 160, image: 'https://placehold.co/600x400?text=White+Sugarcane+Gur' },
            { title: 'Kolai Gur (কলাই করা গুড়)', price: 140, image: 'https://placehold.co/600x400?text=Kolai+Gur' },
            { title: 'Dana Gur (ঘন দানা গুড়)', price: 170, image: 'https://placehold.co/600x400?text=Dana+Gur' },
            { title: 'Liquid Sugarcane Jaggery (খোলা গুড়)', price: 180, image: 'https://placehold.co/600x400?text=Liquid+Sugarcane+Gur' },
        ]
    },
    {
        name: 'Honey (মধু)',
        icon: '🐝',
        products: [
            { title: 'Sundarban Honey (সুন্দরবন বনমধু)', price: 800, image: 'https://placehold.co/600x400?text=Sundarban+Honey' },
            { title: 'Mustard Honey (সরিষা ফুলের মধু)', price: 500, image: 'https://placehold.co/600x400?text=Mustard+Honey' },
            { title: 'Black Cumin Honey (কালোজিরার মধু)', price: 900, image: 'https://placehold.co/600x400?text=Black+Cumin+Honey' },
            { title: 'Litchi Honey (লিচু ফুলের মধু)', price: 600, image: 'https://placehold.co/600x400?text=Litchi+Honey' },
            { title: 'Multiflora Honey (মাল্টিফ্লোরা মধু)', price: 700, image: 'https://placehold.co/600x400?text=Multiflora+Honey' },
            { title: 'Wild Flower Honey (বনফুল মধু)', price: 750, image: 'https://placehold.co/600x400?text=Wild+Flower+Honey' },
            { title: 'Wild Bee Honey (জংলি মৌমাছির মধু)', price: 1200, image: 'https://placehold.co/600x400?text=Wild+Bee+Honey' },
        ]
    },
    {
        name: 'Premium Oils (তেল)',
        icon: '🍾',
        products: [
            // 4. সরিষার তেল
            { title: 'Cold Pressed Mustard Oil (দেশি ঘানি)', price: 250, image: 'https://placehold.co/600x400?text=Mustard+Oil' },
            { title: 'Machine Pressed Mustard Oil (মেশিনে ভাঙ্গা)', price: 200, image: 'https://placehold.co/600x400?text=Machine+Mustard+Oil' },
            { title: 'Black Mustard Oil (কালো সরিষার তেল)', price: 260, image: 'https://placehold.co/600x400?text=Black+Mustard+Oil' },
            { title: 'Yellow Mustard Oil (হলুদ সরিষার তেল)', price: 280, image: 'https://placehold.co/600x400?text=Yellow+Mustard+Oil' },
            // 5. তিলের তেল
            { title: 'White Sesame Oil (সাদা তিলের তেল)', price: 600, image: 'https://placehold.co/600x400?text=White+Sesame+Oil' },
            { title: 'Black Sesame Oil (কালো তিলের তেল)', price: 650, image: 'https://placehold.co/600x400?text=Black+Sesame+Oil' },
            { title: 'Cold Pressed Sesame Oil', price: 700, image: 'https://placehold.co/600x400?text=Cold+Pressed+Sesame' },
        ]
    },
    {
        name: 'Ghee (ঘি)',
        icon: '🧈',
        products: [
            { title: 'Cow Ghee (দেশি গরুর দুধের ঘি)', price: 1200, image: 'https://placehold.co/600x400?text=Cow+Ghee' },
            { title: 'Buffalo Ghee (মহিষের দুধের ঘি)', price: 1100, image: 'https://placehold.co/600x400?text=Buffalo+Ghee' },
            { title: 'Cold Processed Ghee', price: 1300, image: 'https://placehold.co/600x400?text=Cold+Processed+Ghee' },
            { title: 'Organic Ghee (অর্গানিক ঘি)', price: 1400, image: 'https://placehold.co/600x400?text=Organic+Ghee' },
            { title: 'Homemade Ghee (হোমমেড ঘি)', price: 1250, image: 'https://placehold.co/600x400?text=Homemade+Ghee' },
        ]
    },
    {
        name: 'Fruits (ফলমূল)',
        icon: '🍎',
        products: [
            // Mango
            { title: 'Langra Mango (ল্যাংড়া)', price: 120, image: 'https://placehold.co/600x400?text=Langra+Mango' },
            { title: 'Fazli Mango (ফজলি)', price: 100, image: 'https://placehold.co/600x400?text=Fazli+Mango' },
            { title: 'Himsagar Mango (হিমসাগর)', price: 140, image: 'https://placehold.co/600x400?text=Himsagar+Mango' },
            { title: 'Amrapali Mango (আম্রপালি)', price: 110, image: 'https://placehold.co/600x400?text=Amrapali+Mango' },
            // Jackfruit
            { title: 'Guti Jackfruit (গুটি কাঁঠাল)', price: 300, image: 'https://placehold.co/600x400?text=Jackfruit' },
            // Litchi
            { title: 'Bombai Litchi (বোম্বাই লিচু)', price: 400, image: 'https://placehold.co/600x400?text=Litchi' },
            { title: 'Bedana Litchi (বেদানা লিচু)', price: 500, image: 'https://placehold.co/600x400?text=Bedana+Litchi' },
            // Guava
            { title: 'Deshi Guava (দেশি পেয়ারা)', price: 60, image: 'https://placehold.co/600x400?text=Guava' },
            { title: 'Thai Guava (থাই পেয়ারা)', price: 80, image: 'https://placehold.co/600x400?text=Thai+Guava' },
            // Papaya
            { title: 'Green Papaya (গ্রীন পেপে)', price: 40, image: 'https://placehold.co/600x400?text=Papaya' },
            { title: 'Red Lady Papaya', price: 120, image: 'https://placehold.co/600x400?text=Red+Lady+Papaya' },
            // Banana
            { title: 'Sagor Banana (সাগর কলা)', price: 10, image: '/images/banana.png' },
            { title: 'Sabri Banana (সাবরি)', price: 12, image: '/images/banana.png' },
            // Pineapple
            { title: 'Honey Queen Pineapple (হানিকুইন)', price: 60, image: 'https://placehold.co/600x400?text=Pineapple' },
            // Watermelon
            { title: 'Deshi Watermelon (দেশি তরমুজ)', price: 50, image: 'https://placehold.co/600x400?text=Watermelon' },
            // Others
            { title: 'Blackberry (কালো জাম)', price: 200, image: 'https://placehold.co/600x400?text=Blackberry' },
            { title: 'Jujube (দেশি কুল)', price: 80, image: 'https://placehold.co/600x400?text=Jujube' },
            { title: 'Hog Plum (দেশি আমড়া)', price: 60, image: 'https://placehold.co/600x400?text=Hog+Plum' },
            { title: 'Tamarind (দেশি তেঁতুল)', price: 100, image: 'https://placehold.co/600x400?text=Tamarind' },
            { title: 'Green Coconut (ডাব)', price: 80, image: 'https://placehold.co/600x400?text=Green+Coconut' },
            { title: 'Malta (বারি মাল্টা)', price: 180, image: 'https://placehold.co/600x400?text=Malta' },
            { title: 'Custard Apple (দেশি আতা)', price: 250, image: 'https://placehold.co/600x400?text=Custard+Apple' },
        ]
    }
]

async function main() {
    console.log('Start seeding Bengali products...')

    for (const cat of categories) {
        const category = await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: {
                name: cat.name,
                slug: cat.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
                icon: cat.icon,
            },
        })

        console.log(`Created category: ${category.name}`)

        for (const prod of cat.products) {
            await prisma.product.create({
                data: {
                    title: prod.title,
                    slug: prod.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
                    description: `Fresh and authentic ${prod.title}. Sourced directly from farmers.`,
                    price: prod.price,
                    image: prod.image,
                    categoryId: category.id,
                    inStock: true,
                    rating: 5,
                    reviewsCount: 0,
                },
            })
        }
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
