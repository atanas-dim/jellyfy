import { readFile } from "node:fs/promises";
import path from "node:path";

import jellyfyPackage from "../../../../../../../packages/jellyfy/package.json";

// Serve only published CSS and runtime files. Never accept arbitrary filesystem paths.
const PACKAGE_FILES = jellyfyPackage.files.filter(
  (file) => file.endsWith(".css") || file === "index.js",
);

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams(): { file: string }[] {
  return PACKAGE_FILES.map((file) => ({ file }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
): Promise<Response> {
  const { file } = await params;
  if (!PACKAGE_FILES.includes(file))
    return new Response("Not found", { status: 404 });
  const source = await readFile(
    path.join(process.cwd(), "../../packages/jellyfy", file),
    "utf8",
  );
  return new Response(source, {
    headers: {
      "Content-Type": file.endsWith(".css")
        ? "text/css; charset=utf-8"
        : "text/javascript; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
