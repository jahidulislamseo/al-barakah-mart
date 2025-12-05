'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function DeleteProductButton({ productId }: { productId: string }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product?')) return

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                router.refresh()
            } else {
                alert('Failed to delete product')
            }
        } catch (error) {
            console.error(error)
            alert('Error deleting product')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            <Trash className="h-4 w-4" />
        </Button>
    )
}
