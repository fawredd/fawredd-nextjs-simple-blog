'use server'
import { BlogService } from "@/lib/blog-service";
export default async function GetTagsList(){
    const data = await BlogService.getTags()
    return data
}