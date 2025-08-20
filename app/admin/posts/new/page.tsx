'use client'

import { useEffect, useState } from 'react'
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
import GetTagsList from '@/actions/BlogActions'

export default function NewPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    published: false
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [tags,setTags] = useState<string[]>([])

  useEffect(()=>{
      const fetchTags = async ()=> {
        try {
          const fetchedTags = await GetTagsList()
          setTags(fetchedTags)
        }
        catch (e){
          toast.error(`Could not fetch tags. ${e}`)
        }
      }
      fetchTags()

  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    const payload = { ...formData, tags: tags }
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Post creado exitosamente', {
          description: `"${formData.title}" ha sido ${formData.published ? 'publicado' : 'guardado como borrador'}`
        })
        router.push('/admin/posts')
      } else {
        setError(data.error || 'Error al crear el post')
        toast.error('Error al crear el post', {
          description: data.error || 'No se pudo crear el post'
        })
      }
    } catch (error) {
      console.error('Error creating post:', error)
      setError('Error de conexión')
      toast.error('Error de conexión', {
        description: 'No se pudo conectar con el servidor'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className=" bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">Crear Nuevo Post</h1>
          <Link href="/admin/posts">
            <Button variant="outline">Volver a Posts</Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Información del Post</CardTitle>
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
                  value={formData.excerpt}
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
                  value={formData.featured_image}
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
                    setFormData(prev => ({ ...prev, published: checked as boolean }))
                  }
                />
                <Label htmlFor="published">Publicar inmediatamente</Label>
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
                  {isLoading ? 'Creando...' : 'Crear Post'}
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
