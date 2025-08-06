'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Algo salió mal
            </h1>
            <p className="text-gray-600">
              Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={reset}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/'}
            >
              Ir al Inicio
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <details className="text-left">
                <summary className="text-sm font-medium text-gray-700 cursor-pointer mb-2">
                  Detalles del error (desarrollo)
                </summary>
                <pre className="text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
                  {error.message}
                </pre>
              </details>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
