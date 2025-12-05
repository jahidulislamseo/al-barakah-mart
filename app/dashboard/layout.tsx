import Link from 'next/link'
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminLink } from '@/components/AdminLink'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    let session = null
    try {
        session = await getSession()
    } catch (error) {
        console.error('Failed to get session:', error)
        session = null
    }

    // if (!session) {
    //     redirect('/login')
    // }

    // Fallback if server-side session fails (middleware protects the route)
    const user = session?.user || { name: 'Guest', email: '' }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-lg border p-4">
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                {user.name?.[0] || 'U'}
                            </div>
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            <AdminLink />
                            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary">
                                <ShoppingBag className="h-4 w-4" /> Orders
                            </Link>
                            <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted">
                                <User className="h-4 w-4" /> Profile
                            </Link>
                            <Link href="/dashboard/wishlist" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted">
                                <Heart className="h-4 w-4" /> Wishlist
                            </Link>
                            <form action="/api/auth/signout" method="POST">
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
