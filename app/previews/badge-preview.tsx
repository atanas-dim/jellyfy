"use client";

import type { FC } from "react";

import { Badge } from "@/jellyfy/badge";

const BadgePreview: FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Brand</Badge>
      <Badge tone="success">Ready</Badge>
      <Badge tone="warning">Review</Badge>
      <Badge tone="error">Failed</Badge>
    </div>
  );
};

export default BadgePreview;
