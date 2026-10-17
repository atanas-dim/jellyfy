"use client";

import { SearchIcon, SendIcon } from "lucide-react";
import type { FC } from "react";

import { Input } from "@/components/input";

const InputPreview: FC = () => {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
      <div className="w-full max-w-sm">
        <Input placeholder="Your name" label="Full name" />
      </div>
      <div className="w-full max-w-sm">
        <Input
          placeholder="Search"
          label="Search"
          leading={<SearchIcon className="size-4 text-neutral-400" />}
          trailing={<SendIcon className="size-4 text-neutral-400" />}
        />
      </div>
      <div className="w-full max-w-sm">
        <Input placeholder="Nickname" label="Nickname" state="success" />
      </div>
      <div className="w-full max-w-sm">
        <Input placeholder="Email" label="Email" state="error" />
      </div>
      <div className="w-full max-w-sm">
        <Input placeholder="Can't edit" label="Disabled" disabled />
      </div>
    </div>
  );
};

export default InputPreview;
