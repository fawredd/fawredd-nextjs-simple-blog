'use server'
import { BlogService } from "@/lib/blog-service";

//Using server actions instead of API for testing
export default async function GetTagsList(){
    const data = await BlogService.getTags()
    return data
}