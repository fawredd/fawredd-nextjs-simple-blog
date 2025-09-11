import type { Metadata } from 'next'

import { Suspense } from "react";
import SidebarServer from "@/components/sidebar-server";
import Hero from "@/components/hero";
import FeaturePost from "@/components/featurePost";
import Specialities from "@/components/specialities";
import AIgeneratedPost from "@/components/aiBlogPost";
import { GetFeaturedPost } from "@/actions/BlogActions";
import { brand, brandKeywords, SITE_DESCRIPTION, SITE_URL } from "@/lib/config";

//NEED TO UPDATE THIS BASED ON CONFIG
const pageTitle = 'Bioregen Lab - Avances en Medicina Regenerativa'
// ✨ IMPROVEMENT: A dedicated, keyword-rich description for the blog index page
const pageDescription = SITE_DESCRIPTION || 'Líderes en medicina regenerativa y terapias avanzadas.'
const blogUrl = `${SITE_URL}`;

export const metadata: Metadata = {
  // --- Core Metadata ---
  title: pageTitle,
  description: pageDescription,
  keywords: brandKeywords,
  authors: [{ name: "fawredd"}], // Optional: add a URL for the author
  creator: "fawredd",
  publisher: brand, // ✨ Add publisher info

  // ✨ IMPROVEMENT: Add a canonical URL
  alternates: {
    canonical: blogUrl,
  },
  
  icons:{
    icon: "/assets/favicon32.png",
    shortcut: "/assets/favicon16.png",
    apple: "/assets/favicon96.png",
  },
  
  // --- Social Media Cards ---
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: blogUrl,
    siteName: brand, // ✨ IMPROVEMENT: Add the site name
    // ✨ CRITICAL IMPROVEMENT: Add an image for social sharing
    images: [
      {
        url: `${SITE_URL}/assets/logo.jpg`, // URL to a general blog banner image
        width: 1200,
        height: 630,
        alt: `Banner de ${brand} sobre Medicina Regenerativa`,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${SITE_URL}/assets/logo`], // Use the same image
    // creator: "@user", // Optional: Add your brand's X/Twitter handle
  },
  
  // --- Search Engine Instructions ---
  robots:{
    index: true,
    follow: true,
  },

  // ✨ HUGE IMPROVEMENT: Add JSON-LD Structured Data for the website and blog listing page
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "url": SITE_URL,
          "name": brand ,
          "description": "Líderes en medicina regenerativa y terapias celulares.",
          "publisher": { "@id": `${SITE_URL}` },
        },
        {
          "@type": "CollectionPage",
          "url": blogUrl,
          "name": pageTitle,
          "description": pageDescription,
          "isPartOf": { "@id": `${SITE_URL}` }
        },
        {
          "@type": "Organization",
          "@id": `${SITE_URL}`,
          "name": brand,
          "url": SITE_URL,
          "logo": `${SITE_URL }/assets/logo.jpg`
        }
      ]
    }),
  },
};


export default async function HomePage() {
  const featuredPost = await GetFeaturedPost(1);
  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <FeaturePost featuredPost={featuredPost[0]} />
            <Specialities />
            <AIgeneratedPost />
          </div>
          {/* Sidebar */}
          <Suspense
            fallback={
              <div className="w-80 animate-pulse bg-gray-200 h-96 rounded"></div>
            }
          >
            <SidebarServer />
          </Suspense>
        </div>
      </main>
    </>
  );
}
