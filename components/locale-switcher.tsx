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
import { useDictionary } from "@/providers/dictionary";
import { locales } from "@/i18n";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/types/locale";

export default function LocalSwitcher() {
 const { locale } = useDictionary();
 const router = useRouter();
 const pathname = usePathname();

 function handleOnSelect(newLocale: string) {
  const parts = pathname.split("/");
  parts[1] = newLocale;

  setCookie("NEXT_LOCALE", newLocale);

  const newPath = parts.join("/");
  router.push(newPath);
 }

 return (
  <div className="flex items-center">
   <Select onValueChange={(value) => handleOnSelect(value)}>
    <SelectTrigger className="w-auto border-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0">
     <Languages className="w-6 h-6 mr-2"></Languages>
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
