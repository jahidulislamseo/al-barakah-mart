import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting update-images script...')
    console.log('Checking for products with missing or broken images...')

    const products = await prisma.product.findMany()
    console.log(`Found ${products.length} products.`)

    let updatedCount = 0

    for (const p of products) {
        let newImage = p.image

        // Check if image is missing, empty, or a local placeholder that doesn't exist
        if (!p.image || p.image.startsWith('/placeholder') || p.image === '') {
            // Generate a placeholder image based on the title
            const encodedTitle = encodeURIComponent(p.title.split(' ')[0]) // Use first word for simplicity
            newImage = `https://placehold.co/600x400?text=${encodedTitle}`
        } else if (p.image.startsWith('/images/') && !p.image.includes('banana')) {
            // If it's a local image other than banana (which we know exists), check if we want to replace it
            // For now, let's assume other local images might be broken if not found in public/images
            // But let's be conservative and only fix obvious broken ones
        }

        if (newImage !== p.image) {
            console.log(`Updating image for ${p.title}: ${p.image} -> ${newImage}`)
            await prisma.product.update({
                where: { id: p.id },
                data: { image: newImage }
            })
            updatedCount++
        }
    }

    console.log(`Finished. Updated ${updatedCount} products.`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
