import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/google-analytics";

const siteDown = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://bioregen-lab.vercel.app/" key="canonical" />
        <link
          rel="icon"
          href="/assets/favicon16.png"
          type="image/png"
          sizes="16x16"
        />
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body>
        {siteDown ? (
          <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Sitio en mantenimiento</h1>
            <p className="text-lg mb-2">
              Estamos realizando mejoras en el sitio.
            </p>
            <p className="text-lg">Por favor, vuelve más tarde.</p>
          </div>
        ) : (
          <>
            <div className="min-h-screen bg-white relative">
              <Header />
              {children}
              <Footer />
            </div>
            <Toaster />
            <Analytics />
            <GoogleAnalytics />
          </>
        )}
      </body>
    </html>
  );
}
