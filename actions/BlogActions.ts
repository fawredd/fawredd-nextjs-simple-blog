'use server'
import { BlogService } from "@/lib/blog-service";

//Using server actions instead of API for testing
export  async function GetTagsList(){
    const data = await BlogService.getTags()
    return data
}

export async function GetAllBlogPost() {
    const data = await BlogService.getAllPosts(true);
    return data
}