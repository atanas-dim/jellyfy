"use client";

import type { FC } from "react";

import { Radio, RadioItem } from "@/jellyfy/radio";

const RadioPreview: FC = () => {
  return (
    <Radio label="Delivery" defaultValue="standard">
      <RadioItem value="standard">Standard</RadioItem>
      <RadioItem value="express">Express</RadioItem>
    </Radio>
  );
};

export default RadioPreview;
