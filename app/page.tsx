import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SidebarServer from "@/components/sidebar-server";
import Hero from "@/components/hero";
import FeaturePost from "@/components/featurePost";
import Article from "@/components/article";
import Specialities from "@/components/specialities";

export default async function HomePage() {


  return (
    <div className="min-h-screen bg-white">
       <Header />
       <Hero />
       <main className="container mx-auto px-4 py-12">

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="flex-1">
            <FeaturePost />
            <Specialities />
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

      <Footer />
    </div>
  );
}
