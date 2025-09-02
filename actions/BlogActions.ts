'use server'
import { BlogService } from "@/lib/blog-service";
import { BlogPost } from "@/lib/database";

//Using server actions instead of API for testing
export  async function GetTagsList(){
    const data = await BlogService.getTags()
    return data
}

export async function GetAllBlogPost() {
    const data = await BlogService.getAllPosts(true);
    return data
}

export async function GetFeaturedPost(count: number=3):Promise<Pick<BlogPost, 'title' | 'slug' | 'excerpt' | 'featured_image'>[]> {
    const allPosts = await BlogService.getAllPosts(true);
    // Shuffle and take first 'count'
    const shuffled = allPosts.sort(() => 0.5 - Math.random()).map((post) => {
        return {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            featured_image: post.featured_image,
        }
    });
    return shuffled.slice(0, count);
}