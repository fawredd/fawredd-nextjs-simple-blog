import { BlogService } from "@/lib/blog-service";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default async function FeaturePost() {
  const posts = await BlogService.getAllPosts(true);
  const featuredPost = posts[0];
  return (
    <Suspense
      fallback={
        <div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>
      }
    >
      {/* Featured Post */}
      {featuredPost && (
        <Card className={`mb-8 h-96 overflow-hidden relative`}>
          <Image
            src={
              featuredPost.featured_image ||
              "/placeholder.svg?height=400&width=800&query=medical+research"
            }
            alt={featuredPost.title}
            fill
            className="object-cover absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-1">
            <div className="text-center text-white p-6 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-sm">
                {featuredPost.title}
              </h2>
              <p className="text-lg mb-6 opacity-90 drop-shadow-md">
                {featuredPost.excerpt}
              </p>
              <Link href={`/blog/${featuredPost.slug}`}>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                  Leer más
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </Suspense>
  );
}
