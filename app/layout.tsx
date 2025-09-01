import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { brand, footer, brandKeywords } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {Toaster} from '@/components/ui/sonner'
import GoogleAnalytics from "@/components/google-analytics";
import { SITE_DESCRIPTION,SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: `${footer.text}`,
  generator: "fawredd",
  keywords: `${brandKeywords}`,
  authors: [{ name: "fawredd" }],
  creator: "fawredd",
  icons:{
    icon: "/assets/favicon32.png",
    shortcut: "/assets/favicon16.png",
    apple: "/assets/favicon96.png",
  },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "es_AR",
    url: SITE_URL,
    
  },
  robots:{
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
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
        <div className="min-h-screen bg-white relative">
          <Header />
          {children}
          <Footer />
        </div>
        <Toaster />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
