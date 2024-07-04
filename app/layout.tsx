import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Moving Motivators",
 description: "Moving Motivators",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body
    className={cn(
     "min-h-screen bg-background font-sans antialiased min-w-[350px]",
     inter.className
    )}>
    {children}
   </body>
  </html>
 );
}
