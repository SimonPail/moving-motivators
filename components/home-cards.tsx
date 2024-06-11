"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const CardItem = ({ item }: { item: GameItem }) => {
 return (
  <div className="w-full rounded-3xl  shadow-lg">
   <Image
    alt={item.name}
    src={item.path}
    width="10"
    height="10"
    className="w-full relative z-20"
    layout="responsive"
    priority
   />
  </div>
 );
};

export default function VerticalInfiniteCarroussel() {
 const [items, setItems] = useState<GameItem[]>([]);
 const [variants, setVariants] = useState<any>();

 useEffect(() => {
  async function fetchStickers() {
   const res = await fetch("/api/cards-game");
   const result: GameItem[] = await res.json();
   setItems(result);

   setVariants({
    animate: {
     y: [0, -result.length * 300],
     transition: {
      y: {
       repeat: Infinity,
       repeatType: "loop",
       duration: result.length * 20, // Adjust the duration as needed
       ease: "linear",
      },
     },
    },
   });
  }
  fetchStickers();
 }, []);

 return (
  <div className="hidden sm:block h-screen overflow-y-hidden whitespace-nowrap w-[30%] max-w-[270px] px-5">
   <motion.div
    className="flex flex-col space-y-4"
    variants={variants}
    animate="animate">
    {items.map((item, index) => (
     <CardItem key={index} item={item} />
    ))}
    {items.map((item: any, index: any) => (
     <CardItem key={index + items.length} item={item} />
    ))}
   </motion.div>
  </div>
 );
}
