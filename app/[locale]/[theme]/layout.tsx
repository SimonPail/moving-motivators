import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Locale } from "@/types/locale";
import { locales } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import DictionaryProvider from "@/providers/dictionary";
import { ThemeProvider } from "next-themes";

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
 params: { locale },
}: Readonly<{
 children: React.ReactNode;
 params: { locale: Locale };
}>) {
 const dictionary = await getDictionary(locale);

 return (
  <html lang={locale} suppressHydrationWarning>
   <body
    className={cn(
     "min-h-screen antialiased min-w-[350px] font-gothambook bg-gradient-to-br from-primarybackground/80 via-primarybackground/95 to-primarybackground"
    )}>
    <DictionaryProvider dictionary={dictionary} locale={locale}>
     <ThemeProvider>{children}</ThemeProvider>
    </DictionaryProvider>
   </body>
  </html>
 );
}
