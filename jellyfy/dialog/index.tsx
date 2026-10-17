"use client";

import { XIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useRef } from "react";

import { Button } from "../button";

type DialogProps = {
  trigger: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export const Dialog: FC<DialogProps> = ({ trigger, title, description, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button type="button" onClick={() => dialogRef.current?.showModal()}>
        {trigger}
      </Button>
      <dialog
        ref={dialogRef}
        className="jellyfy-dialog"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="jellyfy-overlay noise w-[min(28rem,calc(100vw-2rem))] p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              type="button"
              aria-label="Close"
              className="cursor-pointer text-neutral-500"
              onClick={() => dialogRef.current?.close()}
            >
              <XIcon className="size-4" />
            </button>
          </div>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
          ) : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </dialog>
    </>
  );
};
