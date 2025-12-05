import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from 'lucide-react'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Server-side session check removed to avoid loop. 
    // Middleware handles protection.

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-lg border p-4">
                        <div className="mb-6 px-2">
                            <p className="font-bold text-lg">Admin Panel</p>
                            <p className="text-xs text-muted-foreground">Manage your store</p>
                        </div>

                        <nav className="space-y-1">
                            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted">
                                <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </Link>
                            <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted">
                                <Package className="h-4 w-4" /> Products
                            </Link>
                            <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted">
                                <ShoppingBag className="h-4 w-4" /> Orders
                            </Link>
                            <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted">
                                <Users className="h-4 w-4" /> Users
                            </Link>
                            <form action="/api/auth/signout" method="POST" className="mt-4 pt-4 border-t">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-red-500 hover:bg-red-50">
                                    <LogOut className="h-4 w-4" /> Logout
                                </button>
                            </form>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
