import Image from "next/image";
import React from "react";

interface AppLogoProps extends React.HTMLAttributes<HTMLDivElement> {
 theme: Theme;
}

export default function AppLogo({ theme, className }: AppLogoProps) {
 return (
  <Image
   src={`/images/${theme}/logo_header.svg`}
   width={60}
   height={60}
   alt={theme}
   className={className}
  />
 );
}
