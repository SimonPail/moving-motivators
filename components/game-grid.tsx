"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GameGrid({ items }: { items?: GameItem[] }) {
 const [cards, setCards] = useState<number>(10);

 useEffect(() => {
  if (items?.length) {
   setCards(items.length);
  }
 }, [items]);
 return (
  <div className="grid grid-cols-4 gap-4">
   {Array.from({ length: cards }).map((_, index) => (
    <div
     key={index}
     className="w-full max-w-[300px] h-[100%] flex justify-center flex-col relative bg-blue-100/50 py-[20%] rounded-2xl">
     {!!items?.length && (
      <motion.div
       // style={{ opacity: opacityTop }}
       className="w-4 h-1 bg-red-300 absolute  top-9 left-1/2 rounded-full -translate-x-1/2"></motion.div>
     )}
     {!!items?.length && (
      <motion.div
       // style={{ opacity: opacityBottom }}
       className="w-4 h-1 bg-emerald-300 absolute bottom-9 left-1/2 rounded-full -translate-x-1/2"></motion.div>
     )}
     <div className="aspect-square w-full"></div>
    </div>
   ))}
  </div>
 );
}
