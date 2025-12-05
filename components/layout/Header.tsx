'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useLanguage } from '@/lib/language-context'

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { cartCount } = useCart()
    const { t } = useLanguage()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <button
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">Al Barakah Mart</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground">{t('header.home')}</Link>
                        <Link href="/shop" className="text-foreground/60 transition-colors hover:text-foreground">{t('header.shop')}</Link>
                        {/* Categories link removed or translated if key exists, using 'shop.categories' as fallback or just generic Shop */}
                        <Link href="/about" className="text-foreground/60 transition-colors hover:text-foreground">{t('header.about')}</Link>
                    </nav>

                    {/* Search Bar - Hidden on small mobile */}
                    <div className="hidden sm:flex flex-1 max-w-sm items-center relative">
                        <form
                            className="w-full relative"
                            onSubmit={(e) => {
                                e.preventDefault()
                                const form = e.target as HTMLFormElement
                                const input = form.elements.namedItem('q') as HTMLInputElement
                                if (input.value.trim()) {
                                    window.location.href = `/shop?q=${encodeURIComponent(input.value.trim())}`
                                }
                            }}
                        >
                            <Input
                                name="q"
                                placeholder="Search products..."
                                className="pr-10"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </form>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <LanguageSwitcher />

                        <Link href="/wishlist">
                            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Wishlist</span>
                            </Button>
                        </Link>

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-[10px]">
                                        {cartCount}
                                    </Badge>
                                )}
                                <span className="sr-only">Cart</span>
                            </Button>
                        </Link>

                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="text-muted-foreground">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Account</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search - Visible only on Mobile */}
                <div className="sm:hidden pb-4">
                    <div className="relative">
                        <Input
                            placeholder="Search..."
                            className="pr-10"
                        />
                        <Search className="absolute right-3 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-background border-b md:hidden shadow-lg animate-in slide-in-from-top-2">
                    <nav className="flex flex-col p-4 space-y-4">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/categories"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Categories
                        </Link>
                        <Link
                            href="/track-order"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Track Order
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            My Account
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="mr-2 h-4 w-4" /> Close Menu
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}
