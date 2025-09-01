import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import CarouselContainer from "@/components/carousel-container";
import { Suspense } from "react";

export default async function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-4 text-center">
          <div className="mb-6">
            <div className="text-2xl font-bold text-green-600 mb-2">404</div>
            <h1 className="text-base font-bold text-gray-900 mb-2">
              Página no encontrada
            </h1>
            <div className="text-gray-600">
              <p>Te recomendamos visitar una de las siguientes páginas:</p>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>
            }
          >
            <CarouselContainer />
          </Suspense>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Home className="w-4 h-4 mr-2" />
                Ir al Inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
