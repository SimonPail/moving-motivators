"use client";

import React, { useEffect, useState } from "react";
import ButtonHome from "./button-home";
import Icon from "./ui/icon";
import { socket } from "@/socket";

export default function LiveNavigation() {
 const [connectedUsers, setConnectedUsers] = useState(0);

 useEffect(() => {
  socket.emit("get-user-count", (count: number) => setConnectedUsers(count));
  socket.on("user-count", (count: number) => {
   setConnectedUsers(count);
  });
  return () => {
   socket.off("user-count");
  };
 }, []);

 return (
  <div className="flex justify-between items-center">
   <ButtonHome className="text-white" />
   <div className="flex items-center space-x-2 mr-4">
    <Icon name="UsersRound" className=" w-5 h-5" />{" "}
    <span>{connectedUsers}</span>
   </div>
  </div>
 );
}
