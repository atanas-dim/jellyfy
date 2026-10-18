"use client";

import { XIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { type Color, colorClass } from "../foundation/color";

type DialogProps = {
  trigger: string;
  title: string;
  description?: string;
  color?: Color;
  children?: ReactNode;
};

export const Dialog: FC<DialogProps> = ({
  trigger,
  title,
  description,
  color,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const dialog = (
    <dialog
      ref={dialogRef}
      className="jellyfy-dialog"
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div
        className={twMerge(
          "jellyfy-overlay noise w-[min(28rem,calc(100vw-2rem))] p-6 backdrop-blur-sm",
          color && "jellyfy-soft",
          color && colorClass(color),
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            className="text-surface-foreground cursor-pointer"
            onClick={() => dialogRef.current?.close()}
          >
            <XIcon className="size-4" />
          </button>
        </div>
        {description ? (
          <p className="mt-2 text-sm leading-6">{description}</p>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </dialog>
  );

  return (
    <>
      <Button type="button" onClick={() => dialogRef.current?.showModal()}>
        {trigger}
      </Button>
      {mounted ? createPortal(dialog, document.body) : null}
    </>
  );
};
