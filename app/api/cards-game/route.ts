import { NextRequest, NextResponse } from "next/server";
import path, { basename, extname } from "path";
import fs from "fs/promises";

export async function GET(request: NextRequest, response: NextResponse) {
 try {
  const assetsDirectory = path.join(process.cwd(), "/public/images/stickers");
  const files = await fs.readdir(assetsDirectory);
  const assets = files.map((file) => {
   return {
    name: basename(file, extname(file)),
    path: `/images/stickers/${file}`,
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
