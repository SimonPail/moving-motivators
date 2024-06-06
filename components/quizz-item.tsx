"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { motion, Reorder, useAnimation } from "framer-motion";
import Image from "next/image";

interface Position {
 x: number;
}

export default function QuizzItem({ item }: { item: QuizzItem }) {
 console.log(item.name);
 const parentRef = useRef<HTMLElement>(null);
 const childRef = useRef<HTMLDivElement>(null);
 const [cardPosition, setCardPosition] = useState<Position>({ x: 0 });
 const [dragging, setDragging] = useState<boolean>(false);
 const controls = useAnimation();

 useEffect(() => {
  socket.on("card-moved", (data: Position) => {
   setCardPosition(data);
  });

  return () => {
   socket.off("card-moved");
  };
 }, []);

 const onDragEnd = (event: any, info: any) => {
  setDragging(false);
  const parentRect = parentRef?.current?.getBoundingClientRect();
  const childRect = childRef?.current?.getBoundingClientRect();
  if (!parentRect || !childRect) {
   return;
  }
  console.log(childRect.left, parentRect.left);

  if (childRect.left <= parentRect.left) {
   controls.start({
    x: -50,
    transition: { type: "spring", stiffness: 100 },
   });
   // socket.emit("move-card", { x: 0 });
   return;
  }
  if (childRect.right >= parentRect.right) {
   controls.start({
    x: 50,
    transition: { type: "spring", stiffness: 100 },
   });
   // socket.emit("move-card", { x: newX });
   return;
  }
  // socket.emit("move-card", { x: newX, y: 100 });
 };

 return (
  <Reorder.Item
   ref={parentRef}
   value={item}
   className="mb-2 w-full max-w-[300px] flex justify-center mx-auto relative">
   <motion.div
    ref={childRef}
    // drag="x"
    initial={{ x: 0, y: 0 }}
    dragConstraints={{ left: 0, right: 0 }}
    // onDragEnd={onDragEnd}
    className="relative cursor-pointer w-[80%]">
    <div className="absolute h-full w-full"></div>
    <Image
     alt="Sticker"
     src={item.path}
     width={100}
     height={100}
     layout="responsive"
    />
   </motion.div>
  </Reorder.Item>
 );
}
