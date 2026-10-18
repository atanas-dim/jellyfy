import { codeToHtml } from "shiki";

export const CodeBlock = async ({
  code,
  lang = "html",
}: {
  code: string;
  lang?: string;
}) => {
  const html = await codeToHtml(code, { lang, theme: "github-dark" });
  return (
    <div
      className="code-block mt-4 rounded-2xl border border-neutral-800/80 bg-neutral-800"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
