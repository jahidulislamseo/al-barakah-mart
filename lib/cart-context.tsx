'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from './data'

export interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: Product, quantity?: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    cartTotal: number
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cart')
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse cart', e)
            }
        }
    }, [])

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addItem = (product: Product, quantity = 1) => {
        setItems(current => {
            const existing = current.find(item => item.id === product.id)
            if (existing) {
                return current.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...current, { ...product, quantity }]
        })
    }

    const removeItem = (productId: string) => {
        setItems(current => current.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(productId)
            return
        }
        setItems(current =>
            current.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => setItems([])

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
    const cartCount = items.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
