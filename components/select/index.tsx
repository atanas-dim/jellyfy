"use client";

import type { FC, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import type { Color } from "../foundation/color";
import { nextLayer } from "../foundation/layer";
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
  color?: Color;
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
  color = "neutral",
  disabled,
  message,
  children,
  className,
}) => {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ top: 0, left: 0, width: 0 });
  const [layer, setLayer] = useState(40);
  const triggerId = useId();
  const listId = useId();
  const current = value ?? uncontrolled;

  useEffect(() => {
    if (!open) return;

    const place = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setFrame({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    };

    const frameId = window.requestAnimationFrame(place);

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      const options = [
        ...document.querySelectorAll<HTMLButtonElement>(
          `#${CSS.escape(listId)} [role="option"]:not(:disabled)`,
        ),
      ];
      if (options.length === 0) return;

      const currentIndex = options.findIndex(
        (option) => option === document.activeElement,
      );
      if (event.key === "ArrowDown") {
        event.preventDefault();
        (options[currentIndex + 1] ?? options[0])?.focus({ preventScroll: true });
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        (options[currentIndex - 1] ?? options[options.length - 1])?.focus({
          preventScroll: true,
        });
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    window.setTimeout(() => {
      menuRef.current
        ?.querySelector<HTMLButtonElement>('[role="option"]:not(:disabled)')
        ?.focus({ preventScroll: true });
    }, 0);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [listId, open]);

  const choose = (next: string) => {
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
    setOpen(false);
  };

  return (
    <SelectContext
      value={{
        value: current,
        color,
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
      <div className={twMerge("w-full", className)}>
        <div ref={triggerRef}>
          <SelectTrigger
            id={triggerId}
            listId={listId}
            open={open}
            label={label}
            text={current ? (labels[current] ?? current) : placeholder}
            color={color}
            disabled={disabled}
            onToggle={() => {
              if (!open) setLayer(nextLayer());
              setOpen((currentOpen) => !currentOpen);
            }}
          />
        </div>
        {open
          ? createPortal(
              <div
                ref={menuRef}
                style={{
                  position: "fixed",
                  top: frame.top,
                  left: frame.left,
                  width: frame.width,
                  zIndex: layer,
                }}
              >
                <SelectMenu id={listId}>{children}</SelectMenu>
              </div>,
              document.body,
            )
          : null}
        {message ? (
          <p className="text-error-text mt-1.5 text-xs">{message}</p>
        ) : null}
      </div>
    </SelectContext>
  );
};

export { SelectOption };
