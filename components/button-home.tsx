"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Icon from "./ui/icon";
import { cn } from "@/lib/utils";

export default function ButtonHome({ className }: { className: string }) {
 const router = useRouter();
 return (
  <Button
   variant="link"
   className={cn("flex text-xs items-center font-semibold px-0", className)}
   onClick={() => router.push("/")}>
   <Icon name="MoveLeft" className="mr-2" />
   Home
  </Button>
 );
}
