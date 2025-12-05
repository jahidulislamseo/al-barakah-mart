import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProfileForm } from './profile-form'

async function getUser(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    })
    return user
}

export default async function ProfilePage() {
    let session = null
    try {
        session = await getSession()
    } catch (error) {
        console.error('Failed to get session:', error)
        return null
    }
    if (!session?.user?.email) return null

    const user = await getUser(session.user.email)
    if (!user) return null

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <div className="bg-white p-6 rounded-lg border max-w-2xl">
                <ProfileForm user={user} />
            </div>
        </div>
    )
}
