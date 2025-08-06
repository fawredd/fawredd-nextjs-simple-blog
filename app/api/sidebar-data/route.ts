import { NextResponse } from 'next/server'
import { BlogService } from '@/lib/blog-service'

export async function GET() {
  try {
    const [recentPosts, categories, tags] = await Promise.all([
      BlogService.getRecentPosts(5),
      BlogService.getCategories(),
      BlogService.getTags()
    ])

    return NextResponse.json({
      recentPosts,
      categories,
      tags
    })
  } catch (error) {
    console.error('Error fetching sidebar data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sidebar data' },
      { status: 500 }
    )
  }
}
