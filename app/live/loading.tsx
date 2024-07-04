import Loader from "@/components/loader";
import React from "react";

export default function LiveLoading() {
 return (
  <div className="flex-1 h-full flex items-center justify-center">
   <Loader />
  </div>
 );
}
