export default function HomeLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <div className="min-h-screen h-full px-8 bg-gradient-to-br from-white via-gray-100 to-gray-300 text-slate-800 flex flex-col">
   {children}
  </div>
 );
}
