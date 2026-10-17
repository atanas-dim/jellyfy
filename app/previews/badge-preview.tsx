"use client";

import type { FC } from "react";

import { Badge } from "@/components/badge";

const BadgePreview: FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Brand</Badge>
      <Badge color="success">Ready</Badge>
      <Badge color="warning">Review</Badge>
      <Badge color="error">Failed</Badge>
    </div>
  );
};

export default BadgePreview;
