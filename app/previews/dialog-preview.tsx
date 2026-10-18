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
          <button className="jellyfy-dialog-close" type="submit">
            Close
          </button>
        </form>
        <h2 className="text-lg font-semibold">Publish this draft</h2>
      </div>
    </dialog>
  </>
);

export default DialogPreview;
