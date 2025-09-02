import { SignJWT, jwtVerify } from 'jose'
import { sql } from './database'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

export interface User {
  id: number
  email: string
  name: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(user: User): Promise<string> {
  return new SignJWT({ 
    id: user.id, 
    email: user.email, 
    name: user.name, 
    role: user.role 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const { id, email, name, role } = payload as Record<string, unknown>
    if (
      typeof id === 'number' &&
      typeof email === 'string' &&
      typeof name === 'string' &&
      typeof role === 'string'
    ) {
      return { id, email, name, role } as User
    }
    return null
  } catch {
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const users = await sql`
      SELECT id, email, name, password_hash, role 
      FROM users 
      WHERE email = ${email}
      LIMIT 1
    `
    
    if (users.length === 0) return null
    
    const user = users[0]
    const isValid = await verifyPassword(password, user.password_hash)
    
    if (!isValid) return null
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const users = await sql`
      SELECT id, email, name, role 
      FROM users 
      WHERE id = ${id}
      LIMIT 1
    `
    
    return users.length > 0 ? users[0] as User : null
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function updateUserPassword(id: number, newPassword: string): Promise<boolean> {
  try {
    const hashedPassword = await hashPassword(newPassword)
    await sql`
      UPDATE users 
      SET password_hash = ${hashedPassword}, updated_at = NOW()
      WHERE id = ${id}
    `
    return true
  } catch (error) {
    console.error('Error updating password:', error)
    return false
  }
}

export async function updateUserProfile(id: number, name: string, email: string): Promise<User | null> {
  try {
    const users = await sql`
      UPDATE users 
      SET name = ${name}, email = ${email}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, email, name, role
    `
    
    return users.length > 0 ? users[0] as User : null
  } catch (error) {
    console.error('Error updating profile:', error)
    return null
  }
}
