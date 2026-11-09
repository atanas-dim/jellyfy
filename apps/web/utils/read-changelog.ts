import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type ChangelogEntry = {
  version: string;
  date: string;
  markdown: string;
};

// Release files use exactly these two frontmatter fields; malformed entries fail the build.
const RELEASE_FILE =
  /^---\r?\nversion: "(\d+\.\d+\.\d+)"\r?\ndate: "(\d{4}-\d{2}-\d{2})"\r?\n---\r?\n([\s\S]*)$/;

export const readChangelog = (): ChangelogEntry[] => {
  const directory = path.join(process.cwd(), "public/changelog");
  return readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const match = readFileSync(path.join(directory, file), "utf8").match(
        RELEASE_FILE,
      );
      if (!match) throw new Error(`Invalid changelog entry: ${file}`);
      const [, version, date, markdown] = match;
      const timestamp = Date.parse(`${date}T00:00:00Z`);
      if (
        file !== `${version}.md` ||
        !Number.isFinite(timestamp) ||
        new Date(timestamp).toISOString().slice(0, 10) !== date ||
        !markdown.trim()
      )
        throw new Error(`Invalid changelog version, date, or content: ${file}`);
      return { version, date, markdown: markdown.trim() };
    })
    .sort((a, b) => {
      const left = a.version.split(".").map(Number);
      const right = b.version.split(".").map(Number);
      for (let index = 0; index < 3; index++) {
        const difference = right[index] - left[index];
        if (difference) return difference;
      }
      return 0;
    });
};
