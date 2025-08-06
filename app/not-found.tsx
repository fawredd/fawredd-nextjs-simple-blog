import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-green-600 mb-2">404</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Página no encontrada
            </h1>
            <p className="text-gray-600">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Home className="w-4 h-4 mr-2" />
                Ir al Inicio
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver Atrás
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              ¿Necesitas ayuda? Contáctanos:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                📞 +1 (555) 123-4567
              </p>
              <p className="text-gray-600">
                ✉️ info@etercell.com
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
