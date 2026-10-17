"use client";

import { LoaderIcon, RocketIcon, ThumbsUpIcon } from "lucide-react";
import { type FC, useState } from "react";

import { Button, type ButtonState } from "@/components/button";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

const ButtonPreview: FC = () => {
  const [state, setState] = useState<ButtonState>("idle");

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("processing");
    await delay(2800);
    setState("success");
    await delay(1400);
    setState("idle");
  };

  return (
    <div className="relative z-10 flex flex-col gap-3 perspective-midrange md:flex-row">
      <div className="pointer-events-none absolute inset-0 -z-1 select-none">
        <div className="absolute top-6 -left-16 -z-1 size-28 rounded-xl border-6 border-neutral-700" />
        <div className="absolute -top-8 left-3/5 -z-1 size-32 rounded-full border-6 border-neutral-700" />
        <div className="absolute -right-10 -bottom-2/10 -z-1 size-22 rounded-sm border-6 border-neutral-700" />
      </div>
      <Button className="mx-auto min-w-46" state={state} onClick={handleClick}>
        {state === "idle" && (
          <>
            <RocketIcon className="size-4.5" /> Launch
          </>
        )}
        {state === "processing" && (
          <>
            <LoaderIcon className="size-4.5 animate-spin" /> Processing...
          </>
        )}
        {state === "success" && (
          <>
            <ThumbsUpIcon className="size-4.5 translate-y-0.5 animate-bounce" /> Success!
          </>
        )}
      </Button>
      <Button className="mx-auto min-w-46" state="success" animateLabel={false}>
        <ThumbsUpIcon className="size-4.5 -translate-y-0.5" /> Success!
      </Button>
      <Button className="mx-auto min-w-46" state={state} onClick={handleClick} disabled>
        <RocketIcon className="size-4.5" /> Launch
      </Button>
    </div>
  );
};

export default ButtonPreview;
