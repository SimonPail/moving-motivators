"use client";

import HomeCards from "@/components/home-cards";
import HomeButton from "@/components/home-button";

export default function Home() {
 return (
  <main className="flex-1 flex items-center space-x-24 justify-center">
   <div className="w-full max-w-2xl px-4 ">
    <h1 className="text-6xl font-bold mb-2 max-w-[400px]">Moving Motivators</h1>
    <p className="mb-6">
     Use this interactive tool to uncover personal values and how they influence
     work performance and satisfaction.
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
 );
}
