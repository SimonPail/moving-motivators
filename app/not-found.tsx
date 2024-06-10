import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
 return (
  <div className="min-h-screen px-8 bg-gradient-to-br from-white via-gray-100 to-gray-300 text-slate-800 flex flex-col items-center justify-center">
   <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
   <p>Oops! The page you are looking for does not exist.</p>
   <Link href="/" className="mt-4">
    <Button>Go back to Home</Button>
   </Link>
  </div>
 );
}
