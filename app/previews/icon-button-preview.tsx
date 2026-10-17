"use client";

import { HeartIcon, PlusIcon } from "lucide-react";
import type { FC } from "react";

import { IconButton } from "@/jellyfy/icon-button";

const IconButtonPreview: FC = () => {
  return (
    <div className="flex items-center gap-3">
      <IconButton label="Add">
        <PlusIcon className="size-4.5" />
      </IconButton>
      <IconButton label="Save" state="success">
        <HeartIcon className="size-4.5" />
      </IconButton>
      <IconButton label="Add" disabled>
        <PlusIcon className="size-4.5" />
      </IconButton>
    </div>
  );
};

export default IconButtonPreview;
