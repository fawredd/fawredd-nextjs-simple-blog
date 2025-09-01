'use client'
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "@/components/ui/button";
import parser from "html-react-parser";
import { GetAllBlogPost } from "@/actions/BlogActions";
import { useState, useEffect } from "react";
import type { BlogPost } from "@/lib/database";

export default function FeaturePost() {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await GetAllBlogPost();
      setFeaturedPost(posts[Math.floor(Math.random() * posts.length)]);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);
  if (isLoading) {
    return <div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>
  }
  return (
      (!featuredPost)?(<><p>No hay publicaciones destacadas</p></>):(
        <Card className={`max-w-full mb-8 h-96 overflow-hidden relative border-none`}>
          <Image
            src={featuredPost.featured_image || "/placeholder.svg"}
            alt={featuredPost.title}
            fill
            className="object-cover object-left-top absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 bg-gradient-to-b from-transparent to-white">
            <div className="px-4 md:px-6 max-w-3xl">
              <h2 className="text-center text-green-600 text-2xl md:text-2xl font-bold mb-4 drop-shadow-md">
                {featuredPost.title}
              </h2>
              <div className="text-center text-base mb-6 opacity-90 drop-shadow-sm overflow-hidden line-clamp-4">
                {parser(featuredPost.excerpt || "")}
              </div>
              <Link href={`/blog/${featuredPost.slug}`} className='mx-auto'>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                  Leer más
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))
}
