import Link from 'next/link'
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
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
    const user = {
        name: session?.user?.name || 'Guest',
        email: session?.user?.email || ''
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <DashboardSidebar user={user} />

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
