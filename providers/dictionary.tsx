"use client";

import { Locale } from "@/types/locale";
import { getDictionary } from "@/lib/dictionaries";
import { useContext, createContext, ReactNode } from "react";

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

const DictionaryContext = createContext<{
 dictionary: Dictionary;
 locale: Locale;
} | null>(null);

interface DictionaryProviderProps {
 dictionary: Dictionary;
 locale: Locale;
 children: ReactNode;
}

export default function DictionaryProvider({
 dictionary,
 locale,
 children,
}: DictionaryProviderProps) {
 return (
  <DictionaryContext.Provider value={{ dictionary, locale }}>
   {children}
  </DictionaryContext.Provider>
 );
}

export function useDictionary() {
 const dictionary = useContext(DictionaryContext);
 if (dictionary === null) {
  throw new Error("useDictionary hook must be used within DictionaryProvider");
 }

 return dictionary;
}
