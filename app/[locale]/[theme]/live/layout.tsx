export default function LiveLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <div className="w-full min-h-screen p-8  flex flex-col">
   <div className="max-w-[800px] w-full mx-auto flex-1 flex flex-col overflow-y-auto">
    {children}
   </div>
  </div>
 );
}
