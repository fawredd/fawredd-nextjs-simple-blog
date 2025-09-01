"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import FeaturePost from "@/components/featurePost";

export default function CarouselContainer() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="mx-16 my-8"
    >
      <CarouselContent className="-ml-4">
        <CarouselItem className="md:basis-1/2">
          <FeaturePost />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2">
          <FeaturePost />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2">
          <FeaturePost />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
