import ButtonHome from "@/components/button-home";

export default function LiveLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <div className="w-full min-h-screen p-8 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 text-white flex flex-col">
   <div className="max-w-[800px] w-full mx-auto flex-1 flex flex-col overflow-y-auto">
    {children}
   </div>
  </div>
 );
}
