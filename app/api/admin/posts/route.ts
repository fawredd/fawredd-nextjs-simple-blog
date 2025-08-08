import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { BlogService } from '@/lib/blog-service'
import { cookies } from 'next/headers'

export async function GET() {
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

    const posts = await BlogService.getAllPosts(false)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching admin posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const { title, content, excerpt, published, featured_image,tags } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const slug = BlogService.generateSlug(title)
    const post = await BlogService.createPost({
      title,
      slug,
      content,
      excerpt,
      published: published || false,
      author_id: user.id,
      featured_image,
      tags
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      )
    }

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
