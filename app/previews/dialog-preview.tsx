"use client";

import type { FC } from "react";

import { Dialog } from "@/jellyfy/dialog";

const DialogPreview: FC = () => {
  return (
    <Dialog
      trigger="Open dialog"
      title="Publish this draft"
      description="The dialog uses the page's native dialog, so Escape and the focus trap belong to the browser."
    />
  );
};

export default DialogPreview;
