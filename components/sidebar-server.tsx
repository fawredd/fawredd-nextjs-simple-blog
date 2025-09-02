import { BlogService } from '@/lib/blog-service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function SidebarServer() {
  const [recentPosts, tagsResult] = await Promise.all([ //I may add here categories too in the future
    BlogService.getRecentPosts(5),
    BlogService.getTags()
  ])

  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 text-center">Artículos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 w-full mx-1">
            {recentPosts.map((post, index) => (
              <li key={`recentPost${post.id}`} className="flex-shrink-0">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="w-full block whitespace-nowrap overflow-hidden text-ellipsis text-sm hover:text-slate-400 transition-colors p-1"
                >
                  {`${index+1}) ${post.title.substring(0,40)}...`}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Categories 
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Categorías</CardTitle>
        </CardHeader>
        <CardContent className="">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={`sidebarCategory${category.id}`}>
                <Link 
                  href={`/blog/categoria/${category.slug}`}
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors overflow-hidden whitespace-nowrap"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      */}

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Etiquetas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
            {tagsResult.map((tag,tagIndex) => (
              <Link
                key={`sidebarTag${tagIndex}`}
                href={`/blog/etiqueta/${tag}`}
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
