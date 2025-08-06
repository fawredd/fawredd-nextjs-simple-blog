import { NextResponse } from 'next/server'
import { BlogService } from '@/lib/blog-service'

export async function GET() {
  try {
    const posts = await BlogService.getAllPosts(true)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
