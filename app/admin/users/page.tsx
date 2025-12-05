import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { User } from 'lucide-react'

async function getUsers() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { orders: true } } }
    })
    return users
}

export default async function AdminUsersPage() {
    const users = await getUsers()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Users</h1>

            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 font-medium">User</th>
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium">Role</th>
                            <th className="px-4 py-3 font-medium">Joined</th>
                            <th className="px-4 py-3 font-medium">Orders</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <User className="h-4 w-4 text-gray-500" />
                                        </div>
                                        <span className="font-medium">{user.name || 'No Name'}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                                <td className="px-4 py-3">
                                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        {user.role}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-3">{user._count.orders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">No users found.</div>
                )}
            </div>
        </div>
    )
}
