"use client";

const DialogPreview = () => (
  <>
    <button className="jellyfy-button" type="button" onClick={() => {
      const dialog = document.getElementById("preview-dialog");
      if (dialog instanceof HTMLDialogElement) dialog.showModal();
    }}>
      <span>Open dialog</span>
    </button>
    <dialog id="preview-dialog" className="jellyfy-dialog">
      <div className="jellyfy-dialog-panel">
        <form method="dialog">
          <button
            className="jellyfy-surface-button"
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
