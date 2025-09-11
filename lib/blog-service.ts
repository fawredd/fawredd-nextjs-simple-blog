import { sql } from "./database";
import type { BlogPost, Category, PostTag } from "./database";

export class BlogService {
  static async getAllPosts(publishedOnly = true): Promise<BlogPost[]> {
    try {
      const query = publishedOnly
        ? sql`
            SELECT p.*, u.name as author_name
            FROM blog_posts p
            JOIN users u ON p.author_id = u.id
            WHERE p.published = true
            ORDER BY p.created_at DESC
          `
        : sql`
            SELECT p.*, u.name as author_name
            FROM blog_posts p
            JOIN users u ON p.author_id = u.id
            ORDER BY p.created_at DESC
          `;

      const posts = await query;
      return posts as BlogPost[];
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Error fetching posts");
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const posts = await sql`
        SELECT p.*, u.name as author_name
        FROM blog_posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.slug = ${slug} AND p.published = true
        LIMIT 1
      `;

      return posts.length > 0 ? (posts[0] as BlogPost) : null;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw new Error("Error fetching post by slug");
    }
  }

  static async getPostById(id: number): Promise<BlogPost | null> {
    try {
      const posts = await sql`
        SELECT p.*, u.name as author_name
        FROM blog_posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.id = ${id}
        LIMIT 1
      `;

      return posts.length > 0 ? (posts[0] as BlogPost) : null;
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      throw new Error("Error fetching post by ID");
    }
  }

  static async getRecentPosts(limit = 5): Promise<BlogPost[]> {
    try {
      const posts = await sql`
        SELECT id, title, slug, created_at
        FROM blog_posts
        WHERE published = true
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;

      return posts as BlogPost[];
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      throw new Error("Error fetching recent posts");
    }
  }

  static async getCategories(): Promise<Category[]> {
    try {
      const categories = await sql`
        SELECT * FROM categories
        ORDER BY name ASC
      `;

      return categories as Category[];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Error fetching categories");
    }
  }

  static async getTags(): Promise<string[]> {
    try {
      const result = await sql`SELECT DISTINCT unnest(tags) as tags FROM blog_posts ORDER BY tags ASC;`;
      return (result.length > 0)? result.map((tag)=>tag.tags) : []
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw new Error("Error fetching tags");
    }
  }

  static async createPost(data: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    published: boolean;
    author_id: number;
    featured_image?: string;
    tags?: string[];
  }): Promise<BlogPost | null> {
    try {
      const posts = await sql`
        INSERT INTO blog_posts (title, slug, content, excerpt, published, author_id, featured_image, tags, created_at, updated_at)
        VALUES (${data.title}, ${data.slug}, ${data.content}, ${data.excerpt || ""}, ${data.published}, ${data.author_id}, ${data.featured_image || ""},${data.tags || []}, NOW(), NOW())
        RETURNING *
      `;
      return posts.length > 0 ? (posts[0] as BlogPost) : null;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Error creating post");
    }
  }

  static async updatePost(
    id: number,
    data: {
      title: string;
      slug: string;
      content: string;
      excerpt?: string;
      published: boolean;
      featured_image?: string;
      tags?: string[]
    }
  ): Promise<BlogPost | null> {
    try {
      const posts = await sql`
        UPDATE blog_posts 
        SET title = ${data.title}, 
            slug = ${data.slug}, 
            content = ${data.content}, 
            excerpt = ${data.excerpt || ""}, 
            published = ${data.published}, 
            featured_image = ${data.featured_image || ""},
            tags = ${data.tags || []},
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      return posts.length > 0 ? (posts[0] as BlogPost) : null;
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Error updating post");
    }
  }

  static async deletePost(id: number): Promise<boolean> {
    try {
      await sql`DELETE FROM blog_posts WHERE id = ${id}`;
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Error deleting post");
    }
  }

  static async getPostsByTagSlug(
    tagSlug: string[],
    limit = 10
  ): Promise<BlogPost[]> {
    try {
      const posts = await sql`
            SELECT p.*, u.name as author_name
            FROM blog_posts p
            JOIN users u ON p.author_id = u.id
            WHERE p.published = true AND p.tags @> ${tagSlug}
            ORDER BY p.created_at DESC LIMIT ${limit}
      `;
      return posts as BlogPost[];
    } catch (error) {
      console.error("Error fetching tags by slug:", error);
      throw new Error("Error fetching tags by slug");
    }
  }

  static async getTagsOfPostById(id: number): Promise<string[]> {
    try {
      const result = await sql`
      SELECT
          tags
      FROM
          blog_posts AS T1
      WHERE
          T1.id = ${id} AND T1.published = TRUE;
      `;
    // result[0]?.tags is the string[] you want, or [] if not found
    console.log('getTagsOfPostById',JSON.stringify(result))
    return result.length > 0 && Array.isArray(result[0].tags) ? result[0].tags : [];
    } catch (error) {
      console.error("Error fetching tags of post by id:", error);
      throw new Error("Error fetching tags of post by id");
    }
  }

  static async createTags(
    postId: number,
    tagsArrayIds: number[]
  ): Promise<PostTag[] | null> {
    try {
      //Delete all previos tags relations
      await sql`DELETE FROM post_tags WHERE post_id = ${postId}`
      //Create new tags relations
      const tagResults = await Promise.all(
        tagsArrayIds.map(
          async (tagId) => await sql`
            INSERT INTO post_tags (post_id, tag_id)
            VALUES (${postId}, ${tagId})
            RETURNING *
          `
        )
      );

      const tags = tagResults.flat() as PostTag[];
      return tags.length > 0 ? tags : null;
    } catch (error) {
      console.error("Error creating post tags:", error);
      throw new Error("Error creating post tags");
    }
  }

  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  static async GetBlosPostsByUserQuery(userQuery: string): Promise<BlogPost[]> {
    try {
      const posts = await sql`
            SELECT p.*, u.name as author_name
            FROM blog_posts p
            JOIN users u ON p.author_id = u.id
            WHERE p.published = true AND (p.title ILIKE ${'%' + userQuery + '%'} OR p.content ILIKE ${'%' + userQuery + '%'} OR p.excerpt ILIKE ${'%' + userQuery + '%'})
            ORDER BY p.created_at DESC LIMIT 10
      `;
      return posts as BlogPost[];
    } catch (error) {
      console.error("Error fetching posts by user query:", error);
      throw new Error("Error fetching posts by user query");
    }
  }
}
