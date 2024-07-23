"use client";

import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
 const router = useRouter();
 const pathname = usePathname();
 const { theme, setTheme } = useTheme();
 const [isChecked, setIsChecked] = useState(false);

 useEffect(() => {
  const parts = pathname.split("/");
  const themeRouter = parts[2] as Theme;
  console.log(themeRouter);
  setTheme(themeRouter);
  setIsChecked(themeRouter === "engineering");
 }, []);

 const toggleTheme = (isChecked: any) => {
  const parts = pathname.split("/");

  const newTheme = isChecked ? "engineering" : "it";
  setIsChecked(isChecked);
  setTheme(newTheme);
  parts[2] = newTheme;

  setCookie("NEXT_THEME", newTheme);

  const newPath = parts.join("/");
  router.push(newPath);
 };

 return (
  <div>
   <Switch
    checked={isChecked}
    onCheckedChange={(value) => toggleTheme(value)}
   />
  </div>
 );
}
