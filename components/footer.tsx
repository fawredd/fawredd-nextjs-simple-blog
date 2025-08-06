import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/placeholder-logo.svg"
                alt="ETERCELL Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-green-400">ETERCELL</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Líderes en medicina regenerativa y terapias avanzadas. Ofrecemos soluciones innovadoras 
              para restaurar y mejorar tejidos dañados.
            </p>
            <div className="text-sm text-gray-400">
              <p>📍 Dirección: [Tu dirección aquí]</p>
              <p>📞 Teléfono: [Tu teléfono aquí]</p>
              <p>✉️ Email: info@etercell.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/especialidades" className="text-gray-300 hover:text-green-400 transition-colors">
                  Especialidades
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-green-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Especialidades</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Traumatología</li>
              <li className="text-gray-300">Neurología</li>
              <li className="text-gray-300">Odontología</li>
              <li className="text-gray-300">Estética</li>
              <li className="text-gray-300">Salud Sexual</li>
              <li className="text-gray-300">Criopreservación</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ETERCELL. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
