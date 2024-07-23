"use client";

import { setCookie } from "cookies-next";
import { Languages } from "lucide-react";
import React from "react";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { useDictionary } from "@/app/dictionary-provider";
import { locales } from "@/i18n";
import { usePathname, useRouter } from "next/navigation";

export default function LocalSwitch() {
 const { locale } = useDictionary();
 const router = useRouter();
 const pathname = usePathname();

 function handleOnSelect(newLocale: string) {
  const currentPathname = pathname;

  const pathnameWithoutLocale = locales.some((locale) =>
   currentPathname.startsWith(`/${locale}`)
  )
   ? currentPathname.slice(3) // Remove first 3 characters (e.g., '/en', '/fr')
   : currentPathname;

  const newPath = `/${newLocale}${pathnameWithoutLocale}`;

  setCookie("NEXT_LOCALE", newLocale);
  router.push(newPath);
 }

 return (
  <div className="flex items-center">
   <Select onValueChange={(value) => handleOnSelect(value)}>
    <SelectTrigger className="w-auto border-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0">
     <Languages className="w-4 h-4 mr-2"></Languages>
     <SelectValue placeholder={locale.toUpperCase()} />
    </SelectTrigger>
    <SelectContent>
     {locales.map((locale) => (
      <SelectItem key={locale} value={locale}>
       {locale.toUpperCase()}
      </SelectItem>
     ))}
    </SelectContent>
   </Select>
  </div>
 );
}
