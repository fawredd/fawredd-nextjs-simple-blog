"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import FeaturePost from "@/components/featurePost";
import type { BlogPost } from "@/lib/database";
import { GetFeaturedPost } from "@/actions/BlogActions";
import {useState, useEffect} from "react";

export default function CarouselContainer() {
  const [posts, setPosts] = useState<Pick<BlogPost, "title" | "slug" | "excerpt" | "featured_image">[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await GetFeaturedPost(3);
      setPosts(allPosts);
    }
    fetchPosts();
  }, []);
  
  if (posts.length === 0) {
    return <div className="mx-16 my-8">Cargando artículos destacados...</div>;
  }
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="mx-16 my-8"
    >
      <CarouselContent className="-ml-4">
        {posts.map((post, index) => (
          <CarouselItem key={`carouselItem${index}`} className="md:basis-1/2">
            <FeaturePost featuredPost={post} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
