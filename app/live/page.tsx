"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { useRouter, useSearchParams } from "next/navigation";
import GameItem from "@/components/game-item";
import SortableList from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import GameGrid from "@/components/game-grid";
import Loader from "@/components/loader";
import LiveSessionNotFound from "@/components/live-session-not-found";
import ButtonHome from "@/components/button-home";

export default function LivePage() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const sessionIdParams = searchParams.get("sessionId");

 const [items, setItems] = useState<GameItem[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [errorSession, setErrorSession] = useState<boolean>(false);

 useEffect(() => {
  if (sessionIdParams) {
   socket.emit(
    "join-session",
    sessionIdParams,
    (error: string, data: GameItem[]) => {
     if (error) {
      setErrorSession(true);
      setLoading(false);
      return;
     }

     if (data.length) {
      setItems(data);
     } else {
      initItems();
     }
    }
   );
   socket.on("items-updated", (newItems: GameItem[]) => {
    setItems(newItems);
   });
  }

  return () => {
   socket.off("items-updated");
  };
 }, [sessionIdParams, router]);

 useEffect(() => {
  if (items.length) {
   setLoading(false);
  }
 }, [items]);

 async function initItems() {
  const res = await fetch("/api/cards-game");
  const result: GameItem[] = await res.json();
  setItems(result);
  socket.emit("update-items", result);
 }

 const onSortEnd = (oldIndex: number, newIndex: number) => {
  const newItemsOrder = arrayMoveImmutable(items, oldIndex, newIndex);
  setItems(newItemsOrder);
  socket.emit("update-items", newItemsOrder);
 };

 return (
  <>
   {loading ? (
    <div className="flex-1 h-full flex items-center justify-center">
     <Loader />
    </div>
   ) : (
    <>
     {errorSession ? (
      <LiveSessionNotFound />
     ) : (
      <div className="my-auto">
       <ButtonHome className="mr-auto text-white" />
       <div className="relative bg-white rounded-2xl p-6 drop-shadow-md">
        <div className="w-full">
         <GameGrid items={items}></GameGrid>
        </div>
        <SortableList
         onSortEnd={onSortEnd}
         className="absolute top-0 left-0 w-full p-6 grid grid-cols-3 lg:grid-cols-4 gap-4"
         draggedItemClassName="dragged">
         {items.map((item, index) => (
          <GameItem key={`${item.name}`} item={item} />
         ))}
        </SortableList>
       </div>
      </div>
     )}
    </>
   )}
  </>
 );
}
