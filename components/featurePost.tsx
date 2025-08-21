import { BlogService } from "@/lib/blog-service";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import parser from "html-react-parser";

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
            src={featuredPost.featured_image || "/placeholder.svg"}
            alt={featuredPost.title}
            fill
            className="object-cover object-left-top absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 bg-gradient-to-b from-transparent to-white">
            <div className="px-6 max-w-3xl">
              <h2 className="text-center text-green-600 text-2xl md:text-3xl font-bold mb-4 drop-shadow-md">
                {featuredPost.title}
              </h2>
              <p className="text-justify text-base mb-6 opacity-90 drop-shadow-sm overflow-hidden line-clamp-4">
                {parser(featuredPost.excerpt || "")}
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
