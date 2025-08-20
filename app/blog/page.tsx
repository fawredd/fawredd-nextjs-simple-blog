import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import SidebarServer from "@/components/sidebar-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogService } from "@/lib/blog-service";
import { brand, blogIntro } from "@/lib/config";

export default async function BlogPage() {
  const posts = await BlogService.getAllPosts(true);

  return (
 
      <main className="container mx-auto px-4 py-8 my-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">
                {brand} Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {blogIntro}
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid gap-8">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No hay artículos publicados en este momento.
                    </p>
                    <p className="text-gray-400 mt-2">
                      Vuelve pronto para leer nuestras últimas publicaciones.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="md:flex">
                      {/* Post Image */}
                      <div className="md:w-1/3 ml-4">
                        <div className="relative h-64 md:h-full">
                          <Image
                            src={
                              post.featured_image ||
                              "/placeholder.svg?height=300&width=400&query=medical+research"
                            }
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              {new Date(post.created_at).toLocaleDateString(
                                "es-ES",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </Badge>
                            {post.author_name && (
                              <span className="text-sm text-gray-500">
                                Por {post.author_name}
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-2xl hover:text-green-600 transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {post.excerpt && (
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}
                          <Link href={`/blog/${post.slug}`}>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              Leer más
                            </Button>
                          </Link>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <Suspense
            fallback={
              <div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>
            }
          >
            <SidebarServer />
          </Suspense>
        </div>
      </main>
  );
}
