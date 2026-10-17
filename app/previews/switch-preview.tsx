"use client";

import type { FC } from "react";

import { Switch } from "@/components/switch";

const SwitchPreview: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <Switch label="Notifications" defaultChecked />
      <Switch label="Reduced sound" />
    </div>
  );
};

export default SwitchPreview;
