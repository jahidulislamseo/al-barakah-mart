'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'

export function AdminLink() {
    const { data: session } = useSession()

    if (session?.user?.role !== 'admin') {
        return null
    }

    return (
        <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100">
            <LayoutDashboard className="h-4 w-4" /> Admin Panel
        </Link>
    )
}
