'use client'

import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { clsx } from 'clsx'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="flex h-screen bg-muted/40 font-sans">
            {/* Sidebar */}
            <aside className="hidden w-64 border-r bg-card md:block">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-lg text-primary">
                        <span>Admin Panel</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                                pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto p-4 border-t">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
