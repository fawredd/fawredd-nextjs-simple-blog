import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default async function NewsLetterSuscription() {
  return (
    <>
      {/* Newsletter Subscription */}
      <Card className="mt-12 bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Suscríbete a nuestro newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Recibe las últimas noticias sobre medicina regenerativa directamente
            en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Suscribirse
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
