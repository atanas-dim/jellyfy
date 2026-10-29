import { type FC } from "react";
import { codeToHtml } from "shiki";
import { twMerge } from "tailwind-merge";

type CodeBlockProps = {
  code: string;
  lang?: string;
  className?: string;
};

export const CodeBlock: FC<CodeBlockProps> = async ({
  code,
  lang = "html",
  className,
}) => {
  const html = await codeToHtml(code, { lang, theme: "github-dark" });
  return (
    <div
      className={twMerge(
        "code-block mt-4 rounded-2xl border border-neutral-800/80 bg-neutral-800",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
