import { heroSection } from "@/lib/config"
import Image from "next/image";

export default async function Hero() {
    return (
      <section className="relative w-full h-[70vh] overflow-hidden">
        <video
          id="videoIntro"
          loop
          autoPlay
          muted
          playsInline
          poster={heroSection.video.poster}
          className="w-full h-full object-cover"
        >
          <source src={heroSection.video.videoUrl} type="video/mp4" />
          Tu navegador no admite el elemento de video.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-4xl bg-black bg-opacity-30 rounded-md"> 
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <Image src={heroSection.message.imageUrl} alt={heroSection.message.imageAlt} width={200} height={50} className="mx-auto drop-shadow-sm" />
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-sm">
              {heroSection.message.text}
            </p>

          </div>
        </div>
      </section>
    )
}