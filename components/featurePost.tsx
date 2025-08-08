import { BlogService } from "@/lib/blog-service";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default async function FeaturePost() {
  const posts = await BlogService.getAllPosts(true);
  const featuredPost = posts[Math.floor(Math.random() * posts.length)];
  return (
    <Suspense
      fallback={
        <div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>
      }
    >
      {/* Featured Post */}
      {featuredPost && (
        <Card className={`mb-8 h-96 overflow-hidden relative border-none`}>
          <Image
            src={
              featuredPost.featured_image ||
              "/placeholder.svg"
            }
            alt={featuredPost.title}
            fill
            className="object-cover absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-1 bg-gradient-to-b from-transparent to-white">
            <div className="text-center p-6 max-w-3xl">
              <h2 className="text-green-600 text-3xl md:text-4xl font-bold mb-4 text-shadow-slate-600 text-shadow-lg/40">
                {featuredPost.title}
              </h2>
              <p className="text-base mb-6 opacity-90 shadow-slate-600 text-shadow-lg/40">
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
