"use client";

const open = (id: string) => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

export const DialogSample = () => (
  <div className="flex flex-wrap gap-3">
    <button className="btn" type="button" onClick={() => open("docs-dialog")}>
      <span>Open</span>
    </button>
    <button
      className="btn tertiary"
      type="button"
      onClick={() => open("docs-dialog-tinted")}
    >
      <span>Tinted</span>
    </button>
    <dialog id="docs-dialog" className="modal">
      <div className="modal-panel">
        <form method="dialog">
          <button className="btn-bump" type="submit" aria-label="Close">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </form>
        <h2 className="pe-8 text-lg font-semibold">A note</h2>
        <p className="mt-2 text-sm leading-6">
          No color on the panel. The close control follows that surface.
        </p>
      </div>
    </dialog>
    <dialog id="docs-dialog-tinted" className="modal">
      <div className="modal-panel tertiary">
        <form method="dialog">
          <button className="btn-bump" type="submit" aria-label="Close">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </form>
        <h2 className="pe-8 text-lg font-semibold">Tinted</h2>
        <p className="mt-2 text-sm leading-6">
          tertiary on the panel tints the close control too.
        </p>
      </div>
    </dialog>
  </div>
);
