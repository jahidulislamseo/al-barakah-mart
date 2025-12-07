'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
    images: string[]
    title: string
    isNew?: boolean
}

export function ProductGallery({ images, title, isNew }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0])

    // De-duplicate images and ensure we have valid URLs
    const uniqueImages = Array.from(new Set(images)).filter(Boolean)

    return (
        <div className="space-y-4">
            <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-100 shadow-sm">
                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt={title}
                        fill
                        className="object-cover animate-fade-in"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : (
                    <div className="text-9xl">📦</div>
                )}
                {isNew && <Badge className="absolute top-4 left-4 text-sm px-3 py-1 z-10">New Arrival</Badge>}
            </div>

            {uniqueImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                    {uniqueImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={cn(
                                "aspect-square bg-muted/20 rounded-md relative overflow-hidden hover:opacity-80 transition-all border-2",
                                selectedImage === image ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                            )}
                        >
                            <Image
                                src={image}
                                alt={`${title} ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="100px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
