"use client";

import HomeCards from "@/components/home-cards";
import HomeButton from "@/components/home-button";

export default function Home() {
 return (
  <div className="flex-1 flex flex-col justify-center items-center">
   <main className="flex-1 max-w-4xl flex space-x-24 items-center">
    <div className="">
     <h1 className="text-6xl font-bold mb-2 max-w-[400px]">
      Moving Motivators
     </h1>
     <p className="mb-6">
      Use this interactive tool to uncover personal values and how they
      influence work performance and satisfaction.
     </p>
     <div className="mb-10">
      <HomeButton />
      <p className="text-sm text-slate-500 mt-2">
       Start a new session and engage with candidates or team members in a
       meaningful way.
      </p>
     </div>
    </div>
    <HomeCards />
   </main>
  </div>
 );
}
