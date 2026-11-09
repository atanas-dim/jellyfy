import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  // Reuse the actual HTML example rather than maintaining a second plain-CSS gallery.
  const example = await readFile(
    path.join(process.cwd(), "../../examples/html/index.html"),
    "utf8",
  );
  const html = example.replaceAll(
    "./node_modules/jellyfy/",
    "/test-bench/package/",
  );
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
