import { Suspense } from "react"
import SidebarServer from "@/components/sidebar-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SITE_URL, specialties, brand } from "@/lib/config"
import { Metadata } from 'next';

// --- Define constantes para claridad y fácil mantenimiento ---
const pageUrl = `${SITE_URL}/especialidades`;

const pageTitle = 'Especialidades en Medicina Regenerativa | Etercell';
const pageDescription = 'Descubre nuestras especialidades y los tratamientos avanzados con medicina regenerativa para traumatología, dermatología, medicina estética y más. Soluciones innovadoras para tu salud.';

export const metadata: Metadata = {
  // --- Metadatos Principales para SEO ---
  title: pageTitle,
  description: pageDescription,
  
  // ✨ MEJORA: Canonical URL para evitar contenido duplicado
  alternates: {
    canonical: pageUrl,
  },

  // --- Social Cards (Open Graph y Twitter) ---
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: brand,
    // ✨ CRÍTICO: Una imagen representativa de las especialidades
    images: [
      {
        url: `${SITE_URL}/assets/etercell-logo-h.png`, // Debes crear esta imagen
        width: 1200,
        height: 630,
        alt: `Diversas aplicaciones de la medicina regenerativa en las especialidades de ${brand}`,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [`${SITE_URL}/assets/etercell-logo-h.png`],
    // creator: '@user', // Opcional: Tu usuario de X/Twitter
  },
  
  // --- Instrucciones para Robots ---
  robots: {
    index: true,
    follow: true,
  },

  // ✨ MEJORA AVANZADA: JSON-LD con Breadcrumbs y Schema Médico
  // Esto ayuda a Google a entender la estructura de tu sitio y el contexto médico de la página
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalWebPage", // Schema específico para páginas con contenido médico
          "url": pageUrl,
          "name": pageTitle,
          "description": pageDescription,
          "publisher": {
            "@type": "Organization",
            "name": brand,
            "logo": {
              "@type": "ImageObject",
              "url": `${SITE_URL}/assets/etercell-logo-h.png`
            }
          }
        },
        {
          "@type": "BreadcrumbList", // Ayuda a Google a mostrar la ruta en los resultados de búsqueda
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Inicio",
              "item": SITE_URL
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Especialidades",
              "item": pageUrl
            }
          ]
        }
      ]
    })
  }
};

export default async function EspecialidadesPage() {
  return (
      <main className="container mx-auto px-4 py-8 my-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">
                NUESTRAS ESPECIALIDADES
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubre cómo nuestras terapias avanzadas en medicina regenerativa pueden transformar tu salud y bienestar en múltiples especialidades médicas.
              </p>
            </div>

            {/* Specialties Grid */}
            <div className="grid gap-8 mb-12">
              {specialties.map((specialty, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-2xl text-green-600">
                      {specialty.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {specialty.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Aplicaciones principales:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {specialty.applications.map((application, appIndex) => (
                          <li key={appIndex} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                            {application}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <Suspense fallback={<div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>}>
            <SidebarServer />
          </Suspense>
        </div>
      </main>
  )
}
