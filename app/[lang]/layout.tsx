import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Locale } from "@/types/locale";
import { locales } from "@/i18n";
import { getDictionary } from "./dictionaries";
import DictionaryProvider from "../dictionary-provider";

const inter = Poppins({ weight: "500", subsets: ["latin"] });

export async function generateStaticParams() {
 const staticParams = locales.map((locale) => {
  return { lang: locale };
 });
 return staticParams;
}

export const metadata: Metadata = {
 title: "Moving Motivators",
 description: "Moving Motivators",
};

export default async function RootLayout({
 children,
 params: { lang },
}: Readonly<{
 children: React.ReactNode;
 params: { lang: Locale };
}>) {
 const dictionary = await getDictionary(lang);

 return (
  <html lang={lang}>
   <body
    className={cn(
     "min-h-screen bg-background antialiased min-w-[350px] font-gothambook"
    )}>
    <DictionaryProvider dictionary={dictionary} locale={lang}>
     {children}
    </DictionaryProvider>
   </body>
  </html>
 );
}
