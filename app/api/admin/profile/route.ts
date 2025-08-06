import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, updateUserProfile, updateUserPassword } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { name, email, currentPassword, newPassword } = await request.json()

    // Update profile information
    if (name || email) {
      const updatedUser = await updateUserProfile(user.id, name || user.name, email || user.email)
      if (!updatedUser) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
      }
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      const success = await updateUserPassword(user.id, newPassword)
      if (!success) {
        return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
