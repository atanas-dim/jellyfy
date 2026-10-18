"use client";

import { XIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { Button } from "../button";
import { choiceStyle, type Color } from "../foundation/color";
import { IconButton } from "../icon-button";

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
        style={color ? choiceStyle(color) : undefined}
        className="jellyfy-overlay noise w-[min(28rem,calc(100vw-2rem))] p-6 backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <IconButton
            label="Close"
            color="neutral"
            className="size-9"
            style={{
              backgroundColor: "var(--panel)",
              color: "var(--surface-foreground)",
            }}
            onClick={() => dialogRef.current?.close()}
          >
            <XIcon className="size-4" />
          </IconButton>
        </div>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            {description}
          </p>
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
