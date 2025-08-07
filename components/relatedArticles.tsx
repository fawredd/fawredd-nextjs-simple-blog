import { Card, CardContent } from "@/components/ui/card";
import { BlogService } from "@/lib/blog-service";
import Link from "next/link";
interface RelatedArticlesProps {
  tagsSlugArray: string[]
}
export default async function RelatedArticles({ tagsSlugArray }: RelatedArticlesProps) {
    const relatedPosts = await BlogService.getPostsByTagSlug(tagsSlugArray);
  return (
    <>
      {/* Related Articles Section */}
      <Card className="mt-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-green-600 mb-6">
            Artículos Relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related articles */}
            {relatedPosts.length > 0 &&
              relatedPosts.map((post, postIndex) => (
                <div
                  key={`post${postIndex}`}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {post.excerpt?.substring(0, 40)}...
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-green-600 text-sm hover:underline"
                  >
                    Leer más →
                  </Link>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
