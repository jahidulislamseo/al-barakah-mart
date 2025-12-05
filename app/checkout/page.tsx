'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Truck, Banknote } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCart } from '@/lib/cart-context'

export default function CheckoutPage() {
    const { cartTotal, clearCart } = useCart()
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState('cod')

    const total = cartTotal + 60 + Math.round(cartTotal * 0.05)

    if (cartTotal === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p>Cart is empty. Redirecting...</p>
            </div>
        )
    }

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate API call
        setTimeout(() => {
            clearCart()
            alert(`Order Placed Successfully via ${paymentMethod.toUpperCase()}!`)
            router.push('/')
        }, 1500)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-2 gap-12">

                {/* Shipping Details */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Shipping Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input required placeholder="Jahidul" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input required placeholder="Islam" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input required type="tel" placeholder="+880 1..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input required placeholder="House, Road, Area" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">City</label>
                            <Input required placeholder="Dhaka" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Zip Code</label>
                            <Input required placeholder="1200" />
                        </div>
                    </div>
                </div>

                {/* Payment & Order Summary */}
                <div className="space-y-8">

                    <div className="bg-card border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="space-y-3">
                            <div
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'bkash' ? 'border-pink-500 bg-pink-50' : 'hover:bg-muted'}`}
                                onClick={() => setPaymentMethod('bkash')}
                            >
                                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                                    {paymentMethod === 'bkash' && <div className="w-2 h-2 rounded-full bg-pink-500" />}
                                </div>
                                <span className="font-bold text-pink-600">bKash</span>
                                <span className="text-xs text-muted-foreground ml-auto">Pay with bKash</span>
                            </div>

                            <div
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'nagad' ? 'border-orange-500 bg-orange-50' : 'hover:bg-muted'}`}
                                onClick={() => setPaymentMethod('nagad')}
                            >
                                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                                    {paymentMethod === 'nagad' && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                                </div>
                                <span className="font-bold text-orange-600">Nagad</span>
                                <span className="text-xs text-muted-foreground ml-auto">Pay with Nagad</span>
                            </div>

                            <div
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                                onClick={() => setPaymentMethod('cod')}
                            >
                                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                                    {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-primary" />}
                                </div>
                                <Truck className="h-5 w-5 text-primary" />
                                <span className="font-medium">Cash on Delivery</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total Amount</span>
                            <span>৳{total}</span>
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                            Place Order
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            By placing this order, you agree to our Terms and Conditions.
                        </p>
                    </div>

                </div>
            </form>
        </div>
    )
}
