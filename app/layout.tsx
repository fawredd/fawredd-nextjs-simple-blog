import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import "./globals.css";
import { brand, footer, brandKeywords } from "@/lib/config"

export const metadata: Metadata = {
  title: `${brand} - Medicina Regenerativa`,
  description: `${footer.text}`,
  generator: "fawredd",
  keywords: `${brandKeywords}`,
  authors: [{ name: "fawredd" }],
  openGraph: {
    title: `${brand} - Medicina Regenerativa`,
    description: "Líderes en medicina regenerativa y terapias avanzadas.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/assets/favicon16.png" type="image/png" sizes="16x16" />
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
        <Toaster position="top-right" richColors closeButton duration={4000} />
      </body>
    </html>
  );
}
