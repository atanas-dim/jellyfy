export const openDialog = (id) => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

export const Plus = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Info = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 8h.01" />
  </svg>
);

export const Section = ({ title, children }) => (
  <section className="grid gap-4">
    <h2 className="text-sm font-semibold tracking-wide text-neutral-500 uppercase">
      {title}
    </h2>
    {children}
  </section>
);

export const Range = ({ className, label, value }) => (
  <label className={className}>
    {label}
    <span className="range-box">
      <span className="range-track">
        <span className="range-fill" />
      </span>
      <span className="range-thumb" />
      <input type="range" defaultValue={value} />
    </span>
  </label>
);
