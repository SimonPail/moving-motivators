import { NextRequest, NextResponse } from "next/server";
import path, { basename, extname } from "path";
import fs from "fs/promises";

export async function GET(request: NextRequest) {
 const searchParams = request.nextUrl.searchParams;
 const locale = searchParams.get("locale");

 if (!locale) {
  return NextResponse.json(
   { error: "Locale parameter is required" },
   { status: 400 }
  );
 }

 try {
  // Dynamically construct the path based on locale
  const assetsDirectory = path.join(
   process.cwd(),
   `public/images/stickers/${locale}`
  );

  // Check if the directory exists
  try {
   await fs.access(assetsDirectory);
  } catch {
   return NextResponse.json(
    { error: `No assets found for locale: ${locale}` },
    { status: 404 }
   );
  }

  const files = await fs.readdir(assetsDirectory);

  const assets = files.map((file) => {
   return {
    name: basename(file, extname(file)),
    path: `/images/stickers/${locale}/${file}`,
   };
  });

  return NextResponse.json(assets);
 } catch (err) {
  return NextResponse.json(
   { error: "Failed to read assets directory" },
   { status: 500 }
  );
 }
}
