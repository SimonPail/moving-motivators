"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { socket } from "@/socket";
import { Button } from "@/components/ui/button";
import ClipboardButton from "@/components/clipboard-button";

export default function Home() {
 const [sessionUrl, setSessionUrl] = useState<string>("");

 async function createLiveSession() {
  const sessionId = uuidv4();
  socket.emit("create-session", sessionId);
  setSessionUrl(`${window.location.origin}/quizz?sessionId=${sessionId}`);
 }

 return (
  <div className="flex flex-col justify-center items-center min-h-screen">
   <h1 className="font-semibold text-3xl mb-6">Create Live Session</h1>
   {!!sessionUrl && (
    <div className="p-4 bg-slate-800 mb-6 flex items-center">
     <span>{sessionUrl}</span>
     <ClipboardButton url={sessionUrl} />
    </div>
   )}
   <Button onClick={() => createLiveSession()}>Create live session</Button>
  </div>
 );
}
