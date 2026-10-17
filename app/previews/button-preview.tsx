"use client";

import { RocketIcon } from "lucide-react";
import type { FC } from "react";

import { Button } from "@/components/button";

const ButtonPreview: FC = () => {
  return (
    <div className="relative z-10 flex flex-col gap-3 perspective-midrange md:flex-row">
      <div className="pointer-events-none absolute inset-0 -z-1 select-none">
        <div className="absolute top-6 -left-16 -z-1 size-28 rounded-xl border-6 border-neutral-700" />
        <div className="absolute -top-8 left-3/5 -z-1 size-32 rounded-full border-6 border-neutral-700" />
        <div className="absolute -right-10 -bottom-2/10 -z-1 size-22 rounded-sm border-6 border-neutral-700" />
      </div>
      <Button className="mx-auto min-w-46">
        <RocketIcon className="size-4.5" /> Primary
      </Button>
      <Button className="mx-auto min-w-46" color="secondary">
        Secondary
      </Button>
      <Button className="mx-auto min-w-46" color="tertiary">
        Tertiary
      </Button>
      <Button className="mx-auto min-w-46" color="neutral">
        Neutral
      </Button>
    </div>
  );
};

export default ButtonPreview;
