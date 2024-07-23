import "server-only";
import { Locale } from "@/types/locale";

const dictionaries = {
 en: () => import(`../dictionaries/en.json`).then((module) => module.default),
 fr: () => import(`../dictionaries/fr.json`).then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
 console.log({ locale });
 return dictionaries[locale]();
};
