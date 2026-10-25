"use client";

import { useState } from "react";

export const ButtonLoadingSample = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        className={loading ? "btn primary loading" : "btn primary"}
        type="button"
        aria-busy={loading}
      >
        <span>Save</span>
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
