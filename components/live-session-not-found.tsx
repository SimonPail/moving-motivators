"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useDictionary } from "@/providers/dictionary";

export default function LiveSessionNotFound() {
 const { dictionary } = useDictionary();

 return (
  <div className="bg-white rounded-2xl p-6 drop-shadow-md max-w-[400px] mx-auto my-auto text-slate-800 flex flex-col ">
   <h1 className="text-xl font-montheavy mb-2">
    {dictionary.live.notFound.title}
   </h1>
   <p>{dictionary.live.notFound.description}</p>
   <Link href="/" className="mt-4">
    <Button>{dictionary.live.notFound.button}</Button>
   </Link>
  </div>
 );
}
