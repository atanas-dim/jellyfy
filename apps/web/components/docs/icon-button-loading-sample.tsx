"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const IconButtonLoadingSample = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        className={loading ? "btn-icon primary loading" : "btn-icon primary"}
        type="button"
        aria-label="Add"
        aria-busy={loading}
      >
        <PlusIcon />
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => setLoading((current) => !current)}
      >
        <span>{loading ? "Stop" : "Load"}</span>
      </button>
    </div>
  );
};
