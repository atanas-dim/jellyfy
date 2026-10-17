"use client";

import type { FC } from "react";

import { Checkbox } from "@/jellyfy/checkbox";

const CheckboxPreview: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Remember this device" defaultChecked />
      <Checkbox label="Email me the receipt" />
      <Checkbox label="Accept the terms" invalid message="Required" />
    </div>
  );
};

export default CheckboxPreview;
