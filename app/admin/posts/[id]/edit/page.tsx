'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import TagInput from '@/components/tagInput'

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt?: string
  featured_image?: string
  published: boolean
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [formData, setFormData] = useState<BlogPost | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const router = useRouter()
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (resolvedParams?.id) {
      fetchPost()
    }
  }, [resolvedParams])

  const fetchPost = async () => {
    if (!resolvedParams?.id) return

    try {
      const response = await fetch(`/api/admin/posts/${resolvedParams.id}`)
      if (response.ok) {
        const post = await response.json()
        setFormData(post)
        setTags(post.tags)
      } else {
        setError('Post no encontrado')
        toast.error('Post no encontrado')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setError('Error al cargar el post')
      toast.error('Error al cargar el post')
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData || !resolvedParams?.id) return

    setIsLoading(true)
    setError('')
    //Build payload including tags
    const payload = { ...formData, tags: tags }
    try {
      const response = await fetch(`/api/admin/posts/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Post actualizado exitosamente', {
          description: `"${formData.title}" ha sido actualizado`
        })
        router.push('/admin/posts')
      } else {
        setError(data.error || 'Error al actualizar el post')
        toast.error('Error al actualizar el post', {
          description: data.error || 'No se pudo actualizar el post'
        })
      }
    } catch (error) {
      console.error('Error updating post:', error)
      setError('Error de conexión')
      toast.error('Error de conexión', {
        description: 'No se pudo conectar con el servidor'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return
    const { name, value } = e.target
    setFormData(prev => prev ? { ...prev, [name]: value } : null)
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Cargando post...</p>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Post no encontrado</p>
          <Link href="/admin/posts">
            <Button>Volver a Posts</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">Editar Post</h1>
          <Link href="/admin/posts">
            <Button variant="outline">Volver a Posts</Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Editar Información del Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Título del post"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Extracto</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt || ''}
                  onChange={handleChange}
                  placeholder="Breve descripción del post"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="featured_image">Imagen Destacada (URL)</Label>
                <Input
                  id="featured_image"
                  name="featured_image"
                  value={formData.featured_image || ''}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div>
                <Label htmlFor="content">Contenido *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Contenido del post en HTML"
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <span>Tags: </span>
                <TagInput initialTags={tags} onTagsChange={(tags)=>setTags(tags)}/>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => 
                    setFormData(prev => prev ? { ...prev, published: checked as boolean } : null)
                  }
                />
                <Label htmlFor="published">Publicado</Label>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Actualizando...' : 'Actualizar Post'}
                </Button>
                <Link href="/admin/posts">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
