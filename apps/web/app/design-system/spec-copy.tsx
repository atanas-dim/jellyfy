import { isValidElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const COPY_CLASS =
  "space-y-4 text-base leading-7 text-neutral-700 dark:text-neutral-200 [&_a]:underline [&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm dark:[&_code]:bg-neutral-800 [&_h3]:mt-8 [&_h3]:border-t [&_h3]:border-neutral-200 [&_h3]:pt-6 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:tracking-[0.16em] [&_h3]:text-neutral-400 [&_h3]:uppercase dark:[&_h3]:border-neutral-800 [&_li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:max-w-3xl [&_strong]:font-semibold [&_table]:w-full [&_table]:text-sm [&_td]:border-t [&_td]:border-neutral-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top dark:[&_td]:border-neutral-800 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5";

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const SHADE =
  /^(?:TW\s+)?(Indigo|Pink|Teal|Neutral|Green|Amber|Red|Sky)\s+(\d+)$/i;

const textOf = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return "";
};

const Chip = ({ color }: { color: string }) => (
  <span
    aria-hidden="true"
    className="inline-block size-4 shrink-0 rounded-sm border border-neutral-950/20 align-[-0.25em] dark:border-neutral-50/30"
    style={{ backgroundColor: color }}
  />
);

const shadeColor = (value: string) => {
  const match = value.trim().match(SHADE);
  if (!match) return null;
  return `var(--color-${match[1].toLowerCase()}-${match[2]})`;
};

export const SpecCopy = ({
  markdown,
  children,
}: {
  markdown: string;
  children?: ReactNode;
}) => (
  <div className={`mt-4 ${COPY_CLASS}`}>
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ children: code }) => {
          const value = textOf(code).trim();
          if (!HEX.test(value)) return <code>{code}</code>;
          return (
            <span className="inline-flex items-center gap-2">
              <Chip color={value} />
              <code>{code}</code>
            </span>
          );
        },
        td: ({ children: cell }) => {
          const color = shadeColor(textOf(cell));
          return (
            <td>
              {color ? (
                <span className="inline-flex items-center gap-2">
                  <Chip color={color} />
                  {cell}
                </span>
              ) : (
                cell
              )}
            </td>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
    {children}
  </div>
);
