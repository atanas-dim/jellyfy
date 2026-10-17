"use client";

import type { FC } from "react";

import { Textarea } from "@/jellyfy/textarea";

const TextareaPreview: FC = () => {
  return (
    <div className="grid w-full max-w-4xl items-start gap-4 md:grid-cols-2">
      <Textarea label="Note" placeholder="Write a note" />
      <Textarea label="Note" placeholder="Looks good" state="success" />
    </div>
  );
};

export default TextareaPreview;
