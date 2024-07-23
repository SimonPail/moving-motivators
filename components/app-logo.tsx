import Image from "next/image";
import React from "react";

interface AppLogoProps extends React.HTMLAttributes<HTMLDivElement> {
 client: Client;
}

export default function AppLogo({ client, className }: AppLogoProps) {
 return (
  <Image
   src={`/images/${client}/logo_header.svg`}
   width={60}
   height={60}
   alt={client}
   className={className}
  />
 );
}
