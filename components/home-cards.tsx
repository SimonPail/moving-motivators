"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { fetchCardsGame } from "@/lib/cardGameHelpers";
import { usePathname } from "next/navigation";

const CardItem = ({ item }: { item: GameItem }) => {
 return (
  <div className="rounded-[55px] drop-shadow-lg h-full aspect-square">
   <Image
    alt={item.name}
    src={item.path}
    className="z-20 h-full w-auto"
    width={200}
    height={2000}
    priority
   />
  </div>
 );
};

export default function VerticalInfiniteCarroussel() {
 const [items, setItems] = useState<GameItem[]>([]);
 const plugin = useRef(Autoplay({ delay: 4000 }));
 const pathname = usePathname();

 useEffect(() => {
  async function fetchStickers() {
   const result = await fetchCardsGame(pathname);
   setItems(result);
  }
  fetchStickers();
 }, []);

 return (
  <Carousel
   plugins={[plugin.current]}
   className="h-full w-full"
   orientation="vertical"
   opts={{
    align: "start",
    loop: true,
   }}>
   <CarouselContent className="-mt-1 h-screen min-w-[222px]">
    {items.map((item, index) => (
     <CarouselItem key={index} className="basis-1/4 flex">
      <CardItem item={item} />
     </CarouselItem>
    ))}
   </CarouselContent>
  </Carousel>
 );
}
