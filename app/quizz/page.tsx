"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { Reorder, useMotionValue } from "framer-motion";
import QuizzItem from "@/components/quizz-item";
import Image from "next/image";

interface Position {
 x: number;
 y: number;
}

export default function Quizz() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const sessionIdParams = searchParams.get("sessionId");

 const [items, setItems] = useState<QuizzItem[]>([]);
 const [dragging, setDragging] = useState<boolean>(false);

 useEffect(() => {
  if (sessionIdParams) {
   socket.emit("join-session", sessionIdParams, (error?: string) => {
    if (error) {
     router.push("/not-found");
     return;
    }
   });
   socket.on("items-updated", (newItems: QuizzItem[]) => {
    setItems(newItems);
   });
  }

  return () => {
   socket.off("items-updated");
  };
 }, [sessionIdParams, router]);

 useEffect(() => {
  async function fetchStickers() {
   const res = await fetch("/api/quizz");
   const result: QuizzItem[] = await res.json();
   setItems(result);
  }
  fetchStickers();
 }, []);

 function handleSetItems(newItemsOrder: QuizzItem[]) {
  setItems(newItemsOrder);
  socket.emit("update-items", newItemsOrder);
 }

 return (
  <Reorder.Group
   className="bg-white flex flex-wrap"
   values={items}
   onReorder={(items) => handleSetItems(items)}>
   {items.reverse().map((item, index) => (
    <QuizzItem key={`${item.name}`} item={item} />
   ))}
  </Reorder.Group>
 );
}
