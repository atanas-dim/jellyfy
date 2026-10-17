"use client";

import type { FC } from "react";

import { Alert } from "@/components/alert";

const AlertPreview: FC = () => {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert color="success" title="Saved">
        The draft is stored.
      </Alert>
      <Alert color="warning" title="Check the name">
        This one is already in use.
      </Alert>
      <Alert color="error" title="Could not send">
        Try again in a moment.
      </Alert>
    </div>
  );
};

export default AlertPreview;
