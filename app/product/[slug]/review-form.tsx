'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export function ReviewForm({ productId }: { productId: string }) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (rating === 0) return alert('Please select a rating')

        setIsSubmitting(true)
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, rating, comment })
            })

            if (res.ok) {
                setRating(0)
                setComment('')
                router.refresh()
                alert('Review submitted successfully!')
            } else {
                const data = await res.json()
                alert(data.error || 'Failed to submit review')
            }
        } catch (error) {
            alert('An error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border space-y-4">
            <h3 className="font-semibold text-lg">Write a Review</h3>

            <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                        >
                            <Star
                                className={`h-6 w-6 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Comment</label>
                <textarea
                    required
                    className="w-full min-h-[100px] p-3 rounded-md border text-sm"
                    placeholder="Share your thoughts about this product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
        </form>
    )
}
