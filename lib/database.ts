import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)
async function testDb() {
  try {
    const result = await sql`SELECT 1`;
    console.log('Database connection successful! 🎉');
    console.log('Query result:', result);
    
  } catch (error) {
    console.error('Database connection failed! 😟');
    console.error('Error details:', error);
    throw new Error("Stop execution after db test failed")
  } finally {
    console.log('Database test completed.');
  }
}
testDb();

export interface User {
  id: number
  email: string
  name: string
  password_hash: string
  role: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  published: boolean
  author_id: number
  created_at: string
  updated_at: string
  author_name?: string
  tags?: string[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  created_at: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  created_at: string
}

export interface PostCategory {
  post_id: number
  category_id: number
}

export interface PostTag {
  post_id: number
  tag_id: number
}
