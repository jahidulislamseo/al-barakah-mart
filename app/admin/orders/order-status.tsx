'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function OrderStatus({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const router = useRouter()
    const [status, setStatus] = useState(currentStatus)
    const [isLoading, setIsLoading] = useState(false)

    const handleStatusChange = async (newStatus: string) => {
        setStatus(newStatus)
        setIsLoading(true)
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })

            if (res.ok) {
                router.refresh()
            } else {
                alert('Failed to update status')
            }
        } catch (error) {
            console.error(error)
            alert('Error updating status')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isLoading}
            className="p-2 border rounded-md text-sm bg-white"
        >
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
        </select>
    )
}
