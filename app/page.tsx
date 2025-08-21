import { Suspense } from "react";
import SidebarServer from "@/components/sidebar-server";
import Hero from "@/components/hero";
import FeaturePost from "@/components/featurePost";
import Specialities from "@/components/specialities";
import AIgeneratedPost from "@/components/aiBlogPost";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <FeaturePost />
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
