import { sql } from "./database";
import type { BlogPost, Category, PostTag, Tag } from "./database";

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
      return [];
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
      return null;
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
      return null;
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
      return [];
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
      return [];
    }
  }

  static async getTags(): Promise<Tag[]> {
    try {
      const tags = await sql`
        SELECT * FROM tags
        ORDER BY name ASC
      `;

      return tags as Tag[];
    } catch (error) {
      console.error("Error fetching tags:", error);
      return [];
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
  }): Promise<BlogPost | null> {
    try {
      const posts = await sql`
        INSERT INTO blog_posts (title, slug, content, excerpt, published, author_id, featured_image, created_at, updated_at)
        VALUES (${data.title}, ${data.slug}, ${data.content}, ${
        data.excerpt || ""
      }, ${data.published}, ${data.author_id}, ${
        data.featured_image || ""
      }, NOW(), NOW())
        RETURNING *
      `;

      return posts.length > 0 ? (posts[0] as BlogPost) : null;
    } catch (error) {
      console.error("Error creating post:", error);
      return null;
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
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      return posts.length > 0 ? (posts[0] as BlogPost) : null;
    } catch (error) {
      console.error("Error updating post:", error);
      return null;
    }
  }

  static async deletePost(id: number): Promise<boolean> {
    try {
      await sql`DELETE FROM blog_posts WHERE id = ${id}`;
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }

  static async getPostsByTagSlug(
    tagSlug: string[],
    limit = 5
  ): Promise<BlogPost[]> {
    try {
      const posts = await sql`
      SELECT
        T1.id,
        T1.title,
        T1.slug,
        T1.created_at
      FROM blog_posts AS T1
      JOIN post_tags AS T2
        ON T1.id = T2.post_id
      JOIN tags AS T3
        ON T2.tag_id = T3.id
      WHERE
        T3.slug = ${tagSlug}
        AND T1.published = TRUE;
      `;
      return posts as BlogPost[];
    } catch (error) {
      console.error("Error fetching related posts:", error);
      return [];
    }
  }

  static async getTagsOfPostById(id: number): Promise<Tag[]> {
    try {
      const tags = await sql`
      SELECT
          T3.id,
          T3.name,
          T3.slug
      FROM
          blog_posts AS T1
      JOIN
          post_tags AS T2 ON T1.id = T2.post_id
      JOIN
          tags AS T3 ON T2.tag_id = T3.id
      WHERE
          T1.id = ${id} AND T1.published = TRUE;
      `;
      return tags as Tag[];
    } catch (error) {
      console.error("Error fetching related tags:", error);
      return [];
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
      return null;
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
}
