import Link from 'next/link'
import Image from 'next/image'
import {brand, logo, footer, contactData, menuItems } from '@/lib/config'
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src={logo.image}
                alt={logo.alt}
                width={116}
                height={40}
                className="h-10"
              />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {footer.text}
            </p>
            <div className="text-sm text-gray-400">
              {Object.entries(contactData).map(([, value],itemIndex)=>(
                <p key={`contact${itemIndex}`}>{value.label} {value.text}</p>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Enlaces Rápidos</h3>
            <ul key="quickLinks" className="space-y-2">
              {menuItems.map((item, itemIndex)=>(
                <li key={`menuItem${itemIndex}`}>
                  <Link key={`menuItemLink${itemIndex}`} href={item.url} className="text-gray-300 hover:text-green-400 transition-colors">
                    {item.title}
                  </Link>
              </li>  
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {brand}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
