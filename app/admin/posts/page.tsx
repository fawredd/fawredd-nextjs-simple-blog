"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  published: boolean;
  created_at: string;
  author_name?: string;
  featured_image?: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        toast.error("Error al cargar posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Error de conexión al cargar posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
        toast.success("Post eliminado", {
          description: `"${title}" ha sido eliminado correctamente`,
        });
      } else {
        toast.error("Error al eliminar el post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error de conexión al eliminar el post");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Cargando posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">
            Gestión de Posts
          </h1>
          <div className="space-x-4">
            <Link href="/admin">
              <Button variant="outline">Volver al Admin</Button>
            </Link>
            <Link href="/admin/posts/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Post
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No hay posts disponibles</p>
                <Link href="/admin/posts/new">
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">
                    Crear tu primer post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Por {post.author_name} •{" "}
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Publicado" : "Borrador"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {post.excerpt && (
                    <div className="flex flex-1 gap-2 relative">
                      <Image
                        src={post.featured_image || "/placeholder.svg"}
                        alt={post.title}
                        className="rounded-md aspect-square w-auto max-w-20 h-auto mr-1 mb-4"
                        width={40}
                        height={40}
                      />
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(post.id, post.title)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                    {post.published && (
                      <Link href={`/blog/${post.slug}`}>
                        <Button size="sm" variant="ghost">
                          Ver Post
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
