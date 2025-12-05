'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import { ReviewForm } from '@/app/product/[slug]/review-form'

interface ProductTabsProps {
    description: string
    reviews: any[]
    productId: string
    session: any
}

export function ProductTabs({ description, reviews, productId, session }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')

    return (
        <div className="mb-16">
            <div className="border-b mb-6">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`pb-2 hover:text-foreground ${activeTab === 'description' ? 'border-b-2 border-primary font-medium text-primary' : 'text-muted-foreground'}`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-2 hover:text-foreground ${activeTab === 'reviews' ? 'border-b-2 border-primary font-medium text-primary' : 'text-muted-foreground'}`}
                    >
                        Reviews ({reviews.length})
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {activeTab === 'description' ? (
                    <div className="prose prose-sm max-w-none text-gray-600">
                        {/* Render description with newlines */}
                        {description && description.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Reviews List */}
                        <div className="space-y-6">
                            {reviews.length === 0 ? (
                                <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                            ) : (
                                reviews.map((review: any) => (
                                    <div key={review.id} className="border-b pb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-semibold">{review.user.name || 'Anonymous'}</div>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">{review.comment}</p>
                                        <p className="text-xs text-muted-foreground mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {/* Review Form - Visible only in Reviews tab or if user wants consistent layout? 
                    Flipping tabs usually hides right column content if it's unrelated.
                    But in the original design, the review form was ALONGSIDE the reviews. 
                    So if activeTab === 'reviews', we show the form.
                */}
                {activeTab === 'reviews' && (
                    <div>
                        {session ? (
                            <ReviewForm productId={productId} />
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-lg border text-center">
                                <p className="mb-4">Please log in to write a review.</p>
                                <Link href="/login">
                                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Login Now</Badge>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
