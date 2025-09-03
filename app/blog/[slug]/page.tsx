import type { Metadata } from 'next'
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SidebarServer from "@/components/sidebar-server";
import { Badge } from "@/components/ui/badge";
import { BlogService } from "@/lib/blog-service";
import { ArrowLeft, Calendar, User } from "lucide-react";
import parser from "html-react-parser";
import RelatedArticles from "@/components/relatedArticles";
import Tagshow from "@/components/tagshow";
import ShareButton from '@/components/share-button'
import { brand,brandKeywords, SITE_URL } from '@/lib/config';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await BlogService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (

      <main className="container mx-auto my-16 px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Back Navigation */}
            <div className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Blog
              </Link>
            </div>

            {/* Article Header */}
            <article className="mb-8">
              <header className="mb-8">
                {/* Featured Image */}
                {post.featured_image && (
                  <div className="relative h-24 md:h-96 mb-8 rounded-lg overflow-hidden">
                    <Image
                      src={post.featured_image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover object-left-top"
                      priority
                    />
                  </div>
                )}

                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  {post.author_name && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>Por {post.author_name}</span>
                    </div>
                  )}
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Medicina Regenerativa
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <div className="text-base text-gray-600 mb-8 leading-relaxed border-l-4 border-green-600 pl-6 bg-green-50 p-6 rounded-r-lg">
                    {parser(post.excerpt)}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-green-600 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-green-600 prose-blockquote:bg-green-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
                {parser(post.content)}
              </div>
              <div className="mb-4">
                <Tagshow tags={post.tags || []} />
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <p>
                      Última actualización:{" "}
                      {new Date(post.updated_at).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <ShareButton title={post.title} text={post.excerpt} />
                  </div>
                </div>
              </footer>
            </article>
            {post.tags && <RelatedArticles tagsSlugArray={post.tags} />}
          </div>

          {/* Sidebar */}
          <Suspense
            fallback={
              <div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>
            }
          >
            <SidebarServer />
          </Suspense>
        </div>
      </main>

  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await BlogService.getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      description: "El artículo que buscas no existe o ha sido eliminado.",
      robots: {
        index: false, // ✨ Don't index a "not found" page
        follow: true,
      }
    };
  }
  // --- Define shared metadata variables to avoid repetition (DRY) ---
  const pageTitle = `${post.title} - ${brand} Blog`;
  const pageDescription = post.excerpt || `Lee sobre ${post.title} en el blog de ${brand}, especialistas en medicina regenerativa.`;
  const imageUrl = post.featured_image || `${SITE_URL}/assets/etercel-logo-nuevo.png`; // Fallback image
  const pageUrl = `${SITE_URL}/blog/${post.slug}`; // ✨ The canonical URL for this page

return {
    // --- Core Metadata ---
    title: pageTitle,
    description: pageDescription,
    keywords: post?.tags?.join(", ") || brandKeywords, // ✨ Moved to top-level
    authors: [{ name: brand }], // ✨ Standard authors metadata

    // ✨ IMPROVEMENT: Add a canonical URL to prevent duplicate content
    alternates: {
      canonical: pageUrl,
    },

    // --- Social Media Cards ---
    openGraph: {
      title: post.title, // Social titles can be shorter, without the brand name
      description: pageDescription,
      url: pageUrl, // ✨ Crucial for sharing
      siteName: `${brand} Blog`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [brand],
      // ✨ IMPROVEMENT: Provide detailed image metadata
      images: [
        {
          url: imageUrl,
          width: 1200, //  width
          height: 630, //  height
          alt: `${post.title} - ${brand} Blog`, // ✨ Important for accessibility and SEO
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: pageDescription,
      // ✨ IMPROVEMENT: Provide a detailed image object
      images: [{
        url: imageUrl,
        alt: `Imagen de portada para el artículo: ${post.title}`,
      }],
      // creator: "@yourTwitterHandle", // Optional: add your Twitter handle
    },
    
    // --- Search Engine Instructions ---
    robots:{
      index: true,
      follow: true,
      googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
      },
    },

    // ✨ HUGE IMPROVEMENT: Add JSON-LD Structured Data
    // This helps Google understand your content for Rich Results
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": pageDescription,
        "image": imageUrl,
        "url": pageUrl,
        "datePublished": post.created_at,
        "dateModified": post.updated_at,
        "author": {
          "@type": "Person",
          "name": brand,
        },
        "publisher": {
          "@type": "Organization",
          "name": brand,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/assets/etercel-logo-nuevo.png`, // URL to your brand logo
          },
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
        }
      }),
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    const posts = await BlogService.getAllPosts(true);
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
