import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'ETERCELL - Medicina Regenerativa',
  description: 'Líderes en medicina regenerativa y terapias avanzadas. Soluciones innovadoras para restaurar y mejorar tejidos dañados.',
  generator: 'v0.dev',
  keywords: ['medicina regenerativa', 'terapias avanzadas', 'células madre', 'traumatología', 'neurología'],
  authors: [{ name: 'ETERCELL' }],
  openGraph: {
    title: 'ETERCELL - Medicina Regenerativa',
    description: 'Líderes en medicina regenerativa y terapias avanzadas.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  )
}
