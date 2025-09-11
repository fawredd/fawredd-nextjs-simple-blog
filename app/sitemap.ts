import type { MetadataRoute } from "next";
import { BlogService } from "@/lib/blog-service";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await BlogService.getAllPosts();
    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `https://bioregen-lab.vercell.app/blog/${post.slug}`,
      lastModified: new Date(post.updated_at).toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    }));
    return [
      ...postUrls,
      {
        url: "https://bioregen-lab.vercell.app",
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: "https://bioregen-lab.vercell.app/blog",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: "https://bioregen-lab.vercell.app/especialidades",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw new Error("Failed to generate sitemap");
  }
}
