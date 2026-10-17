"use client";

import type { FC } from "react";

import { Card } from "@/jellyfy/card";

const CardPreview: FC = () => {
  return (
    <Card title="Studio notes" className="max-w-sm">
      A resting surface. Same inset and radius as a field, without the press.
    </Card>
  );
};

export default CardPreview;
