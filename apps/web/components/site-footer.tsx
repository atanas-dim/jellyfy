"use client";

import { Footer as AnanasyFooter } from "@atanas.d/ananasy-ui";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { JellyfyLogo } from "./jellyfy-logo";

type SiteFooterProps = {
  className?: string;
};

export const SiteFooter: FC<SiteFooterProps> = ({ className }) => (
  <AnanasyFooter
    variant="inset"
    displayText={[["Jellyfy"], ["Soft controls"]]}
    logo={
      <div className="flex size-12 items-center justify-center bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-800">
        <JellyfyLogo className="h-9 w-auto" />
      </div>
    }
    className={twMerge(
      "surface px-0 py-20 shadow-lg dark:text-neutral-100",
      className,
    )}
    contentClassName="max-w-6xl px-6 sm:px-10"
    displayTextClassName="font-display text-neutral-900 dark:text-neutral-100"
    operatorLineClassName="text-neutral-500 dark:text-neutral-400 [&_a]:decoration-neutral-400 [&_a]:underline-offset-4"
    copyrightLineClassName="text-neutral-500 dark:text-neutral-400"
  />
);
