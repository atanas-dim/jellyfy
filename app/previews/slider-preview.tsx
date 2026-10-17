"use client";

import type { FC } from "react";

import { Slider } from "@/components/slider";

const SliderPreview: FC = () => {
  return <Slider label="Volume" defaultValue={62} />;
};

export default SliderPreview;
