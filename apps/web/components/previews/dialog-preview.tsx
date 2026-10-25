"use client";

const DialogPreview = () => (
  <>
    <button
      className="btn"
      type="button"
      onClick={() => {
        const dialog = document.getElementById("preview-dialog");
        if (dialog instanceof HTMLDialogElement) dialog.showModal();
      }}
    >
      Open dialog
    </button>
    <dialog id="preview-dialog" className="modal">
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
        <h2 className="pe-8 text-lg font-semibold">Publish this draft</h2>
      </div>
    </dialog>
  </>
);

export default DialogPreview;
