import { BlogService } from '@/lib/blog-service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function SidebarServer() {
  const [recentPosts, categories, tagsResult] = await Promise.all([
    BlogService.getRecentPosts(5),
    BlogService.getCategories(),
    BlogService.getTags()
  ])

  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Artículos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={`post${post.id}`}>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={`category${category.id}`}>
                <Link 
                  href={`/categoria/${category.slug}`}
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Etiquetas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tagsResult.map((tag,tagIndex) => (
              <Link
                key={`sidebarTag${tagIndex}`}
                href={`/etiqueta/${tag}`}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-green-100 hover:text-green-600 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
