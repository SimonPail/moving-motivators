"use client";

import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";
import { SortableItem } from "react-easy-sort";

interface Position {
 name: string;
 y: number;
}

export default function GameItem({ item }: { item: GameItem }) {
 const parentRef = useRef<HTMLDivElement>(null);
 const childRef = useRef<HTMLDivElement>(null);

 const [delta, setDelta] = useState(0);

 const controls = useAnimation();
 const y = useMotionValue(0);

 useEffect(() => {
  if (parentRef.current && childRef.current) {
   const parentRect = parentRef.current?.getBoundingClientRect();
   const childRect = childRef.current?.getBoundingClientRect();

   const delta = childRect.top - parentRect.top;

   setDelta(delta);
   y.set(0);
  }
 }, []);

 useEffect(() => {
  if (item.y) {
   moveItem(item.y);
  }
 }, []);

 useEffect(() => {
  // Listen for position updates from the server
  socket.on("card-moved", (data: Position) => {
   if (data.name === item.name && data.y !== y.get()) {
    moveItem(data.y);
   }
  });

  return () => {
   socket.off("card-moved");
  };
 }, [item]);

 const moveItem = (yPos: number) => {
  controls.start({
   y: yPos,
   transition: {
    ease: "easeInOut",
    duration: 0.5,
   },
  });
 };

 const onDragEnd = (event: any, info: any) => {
  const deltaMin = delta / 3;

  let newY = 0;

  if (y.get() < -deltaMin) {
   newY = -delta;
  } else if (deltaMin < y.get()) {
   newY = delta;
  }

  moveItem(newY);
  socket.emit("move-card", { name: item.name, y: newY });
 };

 const reinitPos = () => {
  if (y.get() !== 0) {
   moveItem(0);
   socket.emit("move-card", { name: item.name, y: 0 });
  }
 };

 return (
  <SortableItem>
   <div>
    <motion.div
     ref={parentRef}
     className="w-full max-w-[300px] h-[100%] flex justify-center flex-col relative py-[20%] rounded-2xl">
     <motion.div
      ref={childRef}
      drag="y"
      onClick={() => reinitPos()}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={onDragEnd}
      className="relative cursor-pointer"
      style={{ y }}
      animate={controls}>
      <div className="top-0 absolute h-full w-full z-30"></div>
      <Image
       alt="Sticker"
       src={item.path}
       width="10"
       height="10"
       className="h-full w-auto relative z-20 drop-shadow-md"
       layout="responsive"
       priority
      />
      {/* <div className="top-0 absolute h-full w-full bg-[#30a1db] z-10 rounded-2xl"></div> */}
     </motion.div>
    </motion.div>
   </div>
  </SortableItem>
 );
}
