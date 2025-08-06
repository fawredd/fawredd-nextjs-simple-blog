import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SidebarServer from "@/components/sidebar-server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BlogService } from "@/lib/blog-service"
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { brand } from "@/lib/config"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await BlogService.getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Back Navigation */}
            <div className="mb-6">
              <Link href="/blog" className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Blog
              </Link>
            </div>

            {/* Article Header */}
            <article className="mb-8">
              <header className="mb-8">
                {/* Featured Image */}
                {post.featured_image && (
                  <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
                    <Image
                      src={post.featured_image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  {post.author_name && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>Por {post.author_name}</span>
                    </div>
                  )}
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Medicina Regenerativa
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <div className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-green-600 pl-6 bg-green-50 p-6 rounded-r-lg">
                    {post.excerpt}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-green-600 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-green-600 prose-blockquote:bg-green-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <p>Última actualización: {new Date(post.updated_at).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Compartir Artículo
                    </Button>
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      Solicitar Consulta
                    </Button>
                  </div>
                </div>
              </footer>
            </article>

            {/* Related Articles Section */}
            <Card className="mt-12">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-green-600 mb-6">
                  Artículos Relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Placeholder for related articles */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Avances en Terapia Celular
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Descubre las últimas innovaciones en medicina regenerativa...
                    </p>
                    <Link href="/blog/avances-terapia-celular" className="text-green-600 text-sm hover:underline">
                      Leer más →
                    </Link>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Casos de Éxito en Traumatología
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Conoce historias reales de pacientes que han mejorado...
                    </p>
                    <Link href="/blog/casos-exito-traumatologia" className="text-green-600 text-sm hover:underline">
                      Leer más →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="mt-8 bg-green-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  ¿Interesado en nuestros tratamientos?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Agenda una consulta personalizada con nuestros especialistas en medicina regenerativa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-green-600 hover:bg-gray-100">
                    Agendar Consulta
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                    Más Información
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <Suspense fallback={<div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>}>
            <SidebarServer />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await BlogService.getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado',
      description: 'El artículo que buscas no existe o ha sido eliminado.'
    }
  }

  return {
    title: `${post.title} - ${brand} Blog`,
    description: post.excerpt || `Lee sobre ${post.title} en el blog de ${brand}, especialistas en medicina regenerativa.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Lee sobre ${post.title} en el blog de ${brand}.`,
      images: post.featured_image ? [post.featured_image] : [],
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.author_name ? [post.author_name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Lee sobre ${post.title} en el blog de ${brand}.`,
      images: post.featured_image ? [post.featured_image] : [],
    }
  }
}

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    const posts = await BlogService.getAllPosts(true)
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
