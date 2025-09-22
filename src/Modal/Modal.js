import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./style.css";

/**
 * Props:
 * - open (boolean) : whether modal is visible
 * - onClose (fn)   : called when modal should close (backdrop click, Esc, close button)
 * - title (string) : optional title text
 * - children       : modal content
 *
 * Usage:
 * <Modal open={isOpen} onClose={() => setIsOpen(false)} title="My dialog">...</Modal>
 */
export default function Modal({ open, onClose, title, children }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // Create a portal target
  const portalRoot = document.getElementById("modal-root") || document.body;

  // Lock scrolling and manage focus when modal opens
  useEffect(() => {
    if (!open) return;

    // save last focused element
    lastFocusedRef.current = document.activeElement;

    // lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus the dialog content
    const focusable = dialogRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (focusable || dialogRef.current)?.focus?.();

    // ESC key handler
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
      // simple trap: keep focus inside modal on Tab
      if (e.key === "Tab") {
        const focusableEls = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        } else if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
      // restore focus
      lastFocusedRef.current?.focus?.();
    };
  }, [open, onClose]);

  // If not open, render nothing (or portal with hidden — here we render nothing)
  if (!open) return null;

  // Clicking on overlay/backdrop closes modal
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  const modalContent = (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onMouseDown={handleBackdropClick} /* use mouse down for snappier UX */
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-dialog"
        ref={dialogRef}
        role="document"
        tabIndex={-1} /* make it focusable */
        onMouseDown={(e) => e.stopPropagation()} /* prevent backdrop click from firing when clicking inside */
      >
        <header className="modal-header">
          {title ? (
            <h3 id="modal-title" className="modal-title">
              {title}
            </h3>
          ) : null}
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </header>

        <div className="modal-body">{children}</div>

        <footer className="modal-footer">
          <button className="modal-action" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, portalRoot);
}
