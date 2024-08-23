"use client";

import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { useTheme } from "next-themes";
import { Cog, Computer } from "lucide-react";
import { ENGINEERING_THEME, IT_THEME } from "@/themes";

export function ThemeSwitcher() {
 const router = useRouter();
 const pathname = usePathname();
 const { theme, setTheme } = useTheme();
 const [isChecked, setIsChecked] = useState(false);

 useEffect(() => {
  const parts = pathname.split("/");
  const themeRouter = parts[2] as Theme;
  setTheme(themeRouter);
  setIsChecked(themeRouter === ENGINEERING_THEME);
 }, []);

 const toggleTheme = (isChecked: any) => {
  const parts = pathname.split("/");

  const newTheme = isChecked ? ENGINEERING_THEME : IT_THEME;
  setIsChecked(isChecked);
  setTheme(newTheme);
  parts[2] = newTheme;

  setCookie("NEXT_THEME", newTheme);

  const newPath = parts.join("/");
  router.push(newPath);
 };

 return (
  <div className="flex space-x-3">
   <Computer className="h-6 w-6" />
   <Switch
    checked={isChecked}
    onCheckedChange={(value) => toggleTheme(value)}
   />
   <Cog className="h-6 w-6" />
  </div>
 );
}
