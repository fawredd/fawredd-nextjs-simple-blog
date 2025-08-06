import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

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
