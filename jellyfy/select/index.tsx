"use client";

import type { FC, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import type { FieldTone } from "../foundation/float-label";
import { SelectContext } from "./context";
import { SelectMenu } from "./menu";
import { SelectOption } from "./option";
import { SelectTrigger } from "./trigger";

type SelectProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  tone?: FieldTone;
  disabled?: boolean;
  message?: string;
  children: ReactNode;
  className?: string;
};

export const Select: FC<SelectProps> = ({
  label,
  placeholder = "Choose",
  value,
  defaultValue,
  onValueChange,
  tone = "idle",
  disabled,
  message,
  children,
  className,
}) => {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const listId = useId();
  const current = value ?? uncontrolled;

  useEffect(() => {
    if (!open || !rootRef.current) return;
    const root = rootRef.current;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      const options = [
        ...root.querySelectorAll<HTMLButtonElement>(
          '[role="option"]:not(:disabled)',
        ),
      ];
      if (options.length === 0) return;

      const currentIndex = options.findIndex(
        (option) => option === document.activeElement,
      );
      if (event.key === "ArrowDown") {
        event.preventDefault();
        (options[currentIndex + 1] ?? options[0])?.focus();
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        (options[currentIndex - 1] ?? options[options.length - 1])?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => {
      root
        .querySelector<HTMLButtonElement>('[role="option"]:not(:disabled)')
        ?.focus();
    }, 0);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (next: string) => {
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
    setOpen(false);
  };

  return (
    <SelectContext
      value={{
        value: current,
        register: (optionValue, optionLabel) => {
          setLabels((currentLabels) =>
            currentLabels[optionValue] === optionLabel
              ? currentLabels
              : { ...currentLabels, [optionValue]: optionLabel },
          );
        },
        choose,
      }}
    >
      <div ref={rootRef} className={twMerge("relative w-full", className)}>
        <SelectTrigger
          id={triggerId}
          listId={listId}
          open={open}
          label={label}
          text={current ? (labels[current] ?? current) : placeholder}
          tone={tone}
          disabled={disabled}
          onToggle={() => setOpen((currentOpen) => !currentOpen)}
        />
        <div hidden={!open}>
          <SelectMenu id={listId}>{children}</SelectMenu>
        </div>
        {message ? (
          <p className="text-error-foreground mt-1.5 text-xs">{message}</p>
        ) : null}
      </div>
    </SelectContext>
  );
};

export { SelectOption };
