"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useDictionary } from "../dictionary-provider";

export default function NotFound() {
 const { dictionary } = useDictionary();

 return (
  <div className="min-h-screen px-8 bg-gradient-to-br from-white via-gray-100 to-gray-300 text-slate-800 flex flex-col items-center justify-center">
   <h1 className="text-3xl font-montheavy mb-2">{dictionary.notFound.title}</h1>
   <p>{dictionary.notFound.description}</p>
   <Link href="/" className="mt-4">
    <Button>{dictionary.notFound.button}</Button>
   </Link>
  </div>
 );
}
