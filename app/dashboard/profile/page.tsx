import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProfileContent } from '@/components/dashboard/ProfileContent'

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
        <ProfileContent user={user} />
    )
}
