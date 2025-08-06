import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SidebarServer from "@/components/sidebar-server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BlogService } from "@/lib/blog-service"

export default async function HomePage() {
  const posts = await BlogService.getAllPosts(true)
  const featuredPost = posts[0]

  return (
    <div className="min-h-screen bg-white">
      
      <Header />

      {/* Hero Video Section */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <video
          id="videoIntro"
          loop
          autoPlay
          muted
          playsInline
          poster="/placeholder.svg"
          className="w-full h-full object-cover"
        >
          <source src="/assets/IntroLow.mp4" type="video/mp4" />
          Tu navegador no admite el elemento de video.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <Image src="/assets/Etercell-logo-nuevo.png" alt="Etercell Logo" width={200} height={50} className="mx-auto" />
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Terapias Avanzadas y Medicina Regenerativa para una Vida Mejor
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Conoce Nuestros Servicios
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Post */}
            {featuredPost && (
              <Card className="mb-8 overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src={featuredPost.featured_image || "/placeholder.svg?height=400&width=800&query=medical+research"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white p-6 max-w-2xl">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
                      <p className="text-lg mb-6 opacity-90">{featuredPost.excerpt}</p>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">Leer más</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Main Article */}
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-green-600 mb-6">
                ETERCELL: TERAPIAS AVANZADAS Y MEDICINA REGENERATIVA PARA UNA VIDA MEJOR.
              </h2>
              <p className="text-gray-600 mb-6">Somos líderes en medicina regenerativa</p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-700 leading-relaxed">
                  Líderes en brindar soluciones innovadoras para restaurar y mejorar tejidos dañados. Nos centramos en
                  medicina regenerativa especializada en medicina regenerativa, ofreciendo nuestros servicios para las
                  terapias y tratamientos vanguardistas que promuevan la recuperación y la regeneración de tejidos y
                  órganos dañados.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Vivimos en nuestro para avanzar juntos en el futuro de la medicina regenerativa en Latinoamérica.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
                <h3 className="text-xl font-bold text-green-600 mb-4">
                  ETERCELL - TERAPIAS AVANZADAS EN MEDICINA REGENERATIVA
                </h3>
                <p className="text-gray-700">
                  Para conocer más en detalle nuestras soluciones te proponemos concertar una reunión virtual y te
                  invitamos a conocer nuestro laboratorio presencialmente.
                </p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">SOLICITE UNA CITA</Button>
              </div>

              {/* Specialties Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-green-600 mb-6">ESPECIALIDADES</h2>

                <div className="space-y-6">
                  {[
                    {
                      title: "TRAUMATOLOGÍA",
                      description: "Solo determinados tejidos y órganos son capaces de regenerarse espontáneamente después de una enfermedad o trauma, y esta capacidad humana explora enfoques terapéuticos regenerativos para tratar diversas afecciones. Las células madre mesenquimales (MSC) se derivan de células madre adultas, son multipotentes y ejercen efectos antiinflamatorios e inmunomoduladores, así."
                    },
                    { title: "NEUROLOGÍA", description: "" },
                    { title: "ODONTOLOGÍA", description: "" },
                    { title: "ESTÉTICA", description: "" },
                    { title: "SALUD SEXUAL", description: "" },
                    { title: "CRIOPRESERVACIÓN", description: "" },
                    { title: "ÁREAS DE APLICACIÓN", description: "" }
                  ].map((specialty, index) => (
                    <div key={index} className="border-l-4 border-green-600 pl-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{specialty.title}</h3>
                      {specialty.description && (
                        <p className="text-gray-600 text-sm">{specialty.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </article>
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
