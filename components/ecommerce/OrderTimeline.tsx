'use client'

import { CheckCircle, Circle, Package, Truck, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

const steps = [
    { status: 'PENDING', label: 'Order Placed', icon: Clock },
    { status: 'PROCESSING', label: 'Processing', icon: Package },
    { status: 'SHIPPED', label: 'Shipped', icon: Truck },
    { status: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
]

export function OrderTimeline({ status, createdAt }: { status: OrderStatus, createdAt: string }) {
    if (status === 'CANCELLED') {
        return (
            <div className="flex items-center gap-2 text-destructive font-medium bg-destructive/10 p-3 rounded-md">
                <Circle className="h-5 w-5 fill-current" />
                <span>Order Cancelled</span>
            </div>
        )
    }

    const currentStepIndex = steps.findIndex(s => s.status === status)
    // Map PENDING to index 0. If status is unknown, default to 0.
    const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex

    return (
        <div className="w-full py-4">
            <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500"
                    style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index <= activeIndex
                    const isCompleted = index < activeIndex
                    const isCurrent = index === activeIndex

                    return (
                        <div key={step.status} className="flex flex-col items-center gap-2 bg-white px-2">
                            <div className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300",
                                isActive ? "border-primary bg-primary text-primary-foreground" : "border-gray-300 bg-white text-gray-400"
                            )}>
                                <Icon className="h-4 w-4" />
                            </div>
                            <span className={cn(
                                "text-xs font-medium whitespace-nowrap hidden sm:block",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="mt-4 text-center">
                <p className="text-sm font-medium text-gray-900">
                    Current Status: <span className="text-primary">{status}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                    {new Date(createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    )
}
