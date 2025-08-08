import { Card, CardContent } from "@/components/ui/card";
import { BlogService } from "@/lib/blog-service";
import Link from "next/link";
import Image from "next/image";

interface RelatedArticlesProps {
  tagsSlugArray: string[];
  postId?: number;
}
export default async function RelatedArticles({
  tagsSlugArray,
  postId,
}: RelatedArticlesProps) {
  const dataRelatedPosts = await BlogService.getPostsByTagSlug(tagsSlugArray);
  const relatedPosts = dataRelatedPosts.filter((i) => i.id != postId);
  return (
    <>
      {/* Related Articles Section */}
      <Card className="mt-12 py-4">
        <CardContent className="">
          <h2 className="text-2xl font-bold text-green-600 mb-6">
            {relatedPosts
              ? `Artículos Relacionados`
              : `No se encontraron artículos relacionados`}
          </h2>
          {relatedPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post, postIndex) => (
                <div
                  key={`relatedPost${postIndex}`}
                  className="h-48 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow  overflow-hidden relative"
                >
                  <Image
                    src={post.featured_image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover absolute inset-0 z-0"
                    priority
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-1">
                    <div className="text-center text-white p-2">
                      <h3 className="font-semibold text-white mb-2">
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
