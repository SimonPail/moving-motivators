import HomeCards from "@/components/home-cards";
import HomeButton from "@/components/home-button";
import AppLogo from "@/components/app-logo";
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/types/locale";
import LocalSwitcher from "@/components/locale-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface HomeProps {
 params: { locale: Locale; theme: Theme };
}

export default async function Home({ params: { locale, theme } }: HomeProps) {
 const { home } = await getDictionary(locale);

 return (
  <main className="flex-1 flex items-center space-x-24 justify-center">
   <div className="w-full max-w-xl px-4 flex-1 h-screen flex flex-col justify-center">
    <div className="flex-1 flex flex-col justify-center">
     <AppLogo theme={theme} className="mb-10" />
     <h1 className="text-6xl font-montheavy mb-2 max-w-[400px]">
      {home.title}
     </h1>
     <p className="mb-6">{home.description}</p>
     <div className="mb-10">
      <div>
       <HomeButton />
      </div>
      <p className="text-sm text-slate-500 mt-6">{home.hint}</p>
     </div>
    </div>
    <div className="py-4 flex justify-between items-center w-full">
     <LocalSwitcher />
     <ThemeSwitcher />
    </div>
   </div>

   <div className="basis-1/5">
    <HomeCards />
   </div>
  </main>
 );
}
