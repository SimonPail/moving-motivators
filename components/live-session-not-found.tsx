import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function LiveSessionNotFound() {
 return (
  <div className="bg-white rounded-2xl p-6 drop-shadow-md max-w-[400px] mx-auto my-auto text-slate-800 flex flex-col ">
   <h1 className="text-xl font-bold mb-2">Session Not Found</h1>
   <p>Oops! The session you are looking for does not exist.</p>
   <Link href="/" className="mt-4">
    <Button>Create new session</Button>
   </Link>
  </div>
 );
}
