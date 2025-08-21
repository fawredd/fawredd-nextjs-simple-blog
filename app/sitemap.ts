import type { MetadataRoute } from 'next'
import { BlogService } from '@/lib/blog-service'

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await BlogService.getAllPosts()
  const postUrls:MetadataRoute.Sitemap = posts.map(post => ({
    url: `https://www.etercell.com/blog/${post.slug}`,
    lastModified: new Date(post.updated_at).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))
  return [
    ...postUrls,
    {
      url: 'https://www.etercell.com',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://www.etercell.com/blog',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.etercell.com/especialidades',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },    
  ]
}