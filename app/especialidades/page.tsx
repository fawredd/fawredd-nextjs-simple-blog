import { Suspense } from "react"
import SidebarServer from "@/components/sidebar-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { specialties } from "@/lib/config"

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
