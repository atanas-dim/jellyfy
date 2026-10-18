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
      <span>Open dialog</span>
    </button>
    <dialog id="preview-dialog" className="modal">
      <div className="modal-panel">
        <form method="dialog">
          <button
            className="btn-surface"
            type="submit"
            aria-label="Close"
          >
            ×
          </button>
        </form>
        <h2 className="pe-8 text-lg font-semibold">Publish this draft</h2>
      </div>
    </dialog>
  </>
);

export default DialogPreview;
