import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SidebarServer from "@/components/sidebar-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const specialties = [
  {
    title: "TRAUMATOLOGÍA",
    description: "Solo determinados tejidos y órganos son capaces de regenerarse espontáneamente después de una enfermedad o trauma. Esta capacidad humana explora enfoques terapéuticos regenerativos para tratar diversas afecciones. Las células madre mesenquimales (MSC) se derivan de células madre adultas, son multipotentes y ejercen efectos antiinflamatorios e inmunomoduladores.",
    applications: [
      "Lesiones deportivas",
      "Fracturas complejas",
      "Regeneración de cartílago",
      "Lesiones de ligamentos y tendones"
    ]
  },
  {
    title: "NEUROLOGÍA",
    description: "La medicina regenerativa neurológica se enfoca en la restauración de la función del sistema nervioso mediante terapias celulares avanzadas y factores de crecimiento específicos.",
    applications: [
      "Enfermedades neurodegenerativas",
      "Lesiones de médula espinal",
      "Accidentes cerebrovasculares",
      "Neuropatías periféricas"
    ]
  },
  {
    title: "ODONTOLOGÍA",
    description: "Aplicación de terapias regenerativas en odontología para la restauración de tejidos dentales, periodontales y maxilofaciales.",
    applications: [
      "Regeneración periodontal",
      "Implantología avanzada",
      "Regeneración ósea maxilar",
      "Tratamiento de ATM"
    ]
  },
  {
    title: "ESTÉTICA",
    description: "Medicina estética regenerativa que utiliza células madre y factores de crecimiento para rejuvenecimiento facial y corporal.",
    applications: [
      "Rejuvenecimiento facial",
      "Tratamiento de cicatrices",
      "Regeneración capilar",
      "Lifting no quirúrgico"
    ]
  },
  {
    title: "SALUD SEXUAL",
    description: "Terapias regenerativas aplicadas a la medicina sexual para mejorar la función y calidad de vida sexual tanto en hombres como mujeres.",
    applications: [
      "Disfunción eréctil",
      "Rejuvenecimiento vaginal",
      "Incontinencia urinaria",
      "Mejora de la sensibilidad"
    ]
  },
  {
    title: "CRIOPRESERVACIÓN",
    description: "Conservación de células madre y tejidos a temperaturas ultra bajas para su uso futuro en terapias regenerativas personalizadas.",
    applications: [
      "Preservación de células madre",
      "Banco de tejidos autólogos",
      "Medicina personalizada",
      "Terapias futuras"
    ]
  }
]

export default async function EspecialidadesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
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

                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Consultar Especialidad
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="bg-green-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  ¿Listo para comenzar tu tratamiento?
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Nuestro equipo de especialistas está preparado para ofrecerte la mejor atención personalizada.
                </p>
                <div className="space-x-4">
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
