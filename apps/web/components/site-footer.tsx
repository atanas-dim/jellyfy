"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type FooterDisplayParagraph = string[];

const BASE_FONT_SIZE = 100;
const DEFAULT_FONT_SIZE = 72;
const MAX_FONT_SIZE = 240;
const MIN_FONT_SIZE = 6;
const WIDTH_FIT_RATIO = 0.985;

const createDefaultFontSizes = (
  paragraphs: FooterDisplayParagraph[],
): number[][] => {
  return paragraphs.map((paragraph) => paragraph.map(() => DEFAULT_FONT_SIZE));
};

const areFontSizesEqual = (
  currentFontSizes: number[][],
  nextFontSizes: number[][],
): boolean => {
  if (currentFontSizes.length !== nextFontSizes.length) {
    return false;
  }

  return currentFontSizes.every((currentParagraph, paragraphIndex) => {
    const nextParagraph = nextFontSizes[paragraphIndex];

    if (!nextParagraph || currentParagraph.length !== nextParagraph.length) {
      return false;
    }

    return currentParagraph.every((currentFontSize, lineIndex) => {
      return currentFontSize === nextParagraph[lineIndex];
    });
  });
};

const roundFontSize = (fontSize: number): number => {
  return Math.round(fontSize * 10) / 10;
};

const FooterDisplayText = ({
  paragraphs,
}: {
  paragraphs: FooterDisplayParagraph[];
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fontSizes, setFontSizes] = useState<number[][]>(() =>
    createDefaultFontSizes(paragraphs),
  );
  const [hasMeasured, setHasMeasured] = useState(false);

  const paragraphsSignature = useMemo(() => {
    return paragraphs
      .map((paragraph) => paragraph.join("\u0000"))
      .join("\u0001");
  }, [paragraphs]);

  useLayoutEffect(() => {
    setFontSizes(createDefaultFontSizes(paragraphs));
    setHasMeasured(false);
  }, [paragraphsSignature, paragraphs]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      setHasMeasured(true);
      return;
    }

    let animationFrameId: number | null = null;

    const updateFontSizes = () => {
      const availableWidth = container.clientWidth * WIDTH_FIT_RATIO;

      if (availableWidth <= 0) {
        return;
      }

      const computedStyles = window.getComputedStyle(container);
      const letterSpacing = Number.parseFloat(computedStyles.letterSpacing);
      const resolvedLetterSpacing = Number.isFinite(letterSpacing)
        ? letterSpacing
        : 0;

      context.font = `${computedStyles.fontStyle} normal ${computedStyles.fontWeight} ${BASE_FONT_SIZE}px ${computedStyles.fontFamily}`;

      const nextFontSizes = paragraphs.map((paragraph) => {
        return paragraph.map((line) => {
          const resolvedLine = line.trim() || " ";
          const measuredTextWidth = context.measureText(resolvedLine).width;
          const measuredLineWidth =
            measuredTextWidth +
            Math.max(0, resolvedLine.length - 1) *
              Math.max(0, resolvedLetterSpacing);

          if (measuredLineWidth <= 0) {
            return DEFAULT_FONT_SIZE;
          }

          const fittedFontSize =
            (availableWidth / measuredLineWidth) * BASE_FONT_SIZE;

          return roundFontSize(
            Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, fittedFontSize)),
          );
        });
      });

      setFontSizes((currentFontSizes) => {
        return areFontSizesEqual(currentFontSizes, nextFontSizes)
          ? currentFontSizes
          : nextFontSizes;
      });
      setHasMeasured(true);
    };

    const scheduleFontSizeUpdate = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(updateFontSizes);
    };

    const resizeObserver = new ResizeObserver(() => {
      scheduleFontSizeUpdate();
    });

    resizeObserver.observe(container);
    updateFontSizes();

    const fontFaceSet = "fonts" in document ? document.fonts : null;

    if (fontFaceSet?.addEventListener) {
      fontFaceSet.addEventListener("loadingdone", scheduleFontSizeUpdate);
    }

    void fontFaceSet?.ready.then(() => {
      scheduleFontSizeUpdate();
    });

    return () => {
      resizeObserver.disconnect();

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      if (fontFaceSet?.removeEventListener) {
        fontFaceSet.removeEventListener("loadingdone", scheduleFontSizeUpdate);
      }
    };
  }, [paragraphsSignature, paragraphs]);

  return (
    <div
      ref={containerRef}
      className="font-display w-full max-w-xs font-black text-neutral-950 md:min-h-0 dark:text-neutral-100"
    >
      {hasMeasured ? (
        <div className="flex w-full flex-col gap-2">
          {paragraphs.map((paragraph, paragraphIndex) => (
            <p
              key={`${paragraphIndex}-${paragraph.join("-")}`}
              className="flex flex-col gap-0 leading-[0.9]"
            >
              {paragraph.map((line, lineIndex) => {
                const fontSize =
                  fontSizes[paragraphIndex]?.[lineIndex] ?? DEFAULT_FONT_SIZE;

                return (
                  <span
                    key={`${paragraphIndex}-${lineIndex}-${line}`}
                    className="block whitespace-nowrap"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {line}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const displayText: FooterDisplayParagraph[] = [
  ["Jellyfy"],
  ["Soft controls"],
  ["Made in Brighton with ❤️‍🔥"],
];

export const SiteFooter = ({ className }: { className?: string }) => {
  const year = new Date().getFullYear();

  return (
    <div className="w-full px-2 pb-2 md:px-4 md:pb-4 xl:pb-6">
      <footer
        className={twMerge(
          "surface relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 overflow-hidden rounded-4xl py-20 shadow-lg dark:text-neutral-100",
          className,
        )}
      >
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 gap-6 px-6 sm:px-10 md:grid-cols-2">
          <div className="flex w-full flex-col items-center md:items-start">
            <FooterDisplayText paragraphs={displayText} />
          </div>
          <div className="mt-auto flex w-full shrink-0 flex-col items-center text-sm font-normal md:w-auto md:items-end md:text-right">
            <span className="mb-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              Built by{" "}
              <a
                href="https://adimitrov.com"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-neutral-400 underline-offset-4"
              >
                Atanas Dimitrov
              </a>
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              © {year} adimitrov
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
