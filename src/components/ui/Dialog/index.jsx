/**
 * @file index.jsx
 * @description Accessible native dialog primitive used by portfolio features.
 * @module components/ui/Dialog
 */

import { createContext, useContext, useEffect, useId, useRef } from "react";
import "./styles.css";

const DialogContext = createContext({ onClose: undefined, titleId: undefined });

/**
 * Render an accessible modal using the platform dialog element.
 *
 * @param {Object} props - Dialog configuration.
 * @param {boolean} props.open - Whether the dialog is visible.
 * @param {Function} [props.onClose] - Close request handler.
 * @param {string} [props.ariaLabel] - Accessible label for titleless dialogs.
 * @param {"sm"|"md"|"lg"|"full"} [props.size="md"] - Dialog size contract.
 * @param {"static"|boolean} [props.backdrop=true] - Backdrop dismissal behavior.
 * @param {boolean} [props.keyboard=true] - Whether Escape requests closure.
 * @param {string} [props.className=""] - Additional dialog classes.
 * @param {React.ReactNode} props.children - Dialog content.
 * @returns {JSX.Element} Native dialog element.
 */
const Dialog = ({
  open,
  onClose = undefined,
  ariaLabel = undefined,
  size = "md",
  backdrop = true,
  keyboard = true,
  className = "",
  children,
  overflow: _overflow = undefined,
  placement = undefined,
  ...restProps
}) => {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    } else if (!open && dialog.open) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open || !keyboard) return undefined;

    /**
     * Close the active dialog when Escape is pressed anywhere within the window.
     * This keeps keyboard dismissal reliable when focus is moved by native dialog
     * behavior, an embedded control, or a browser accessibility feature.
     *
     * @param {KeyboardEvent} event - Window keyboard event.
     * @returns {void}
     */
    const handleWindowKeyDown = (event) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      onClose?.();
    };

    window.addEventListener("keydown", handleWindowKeyDown);
    return () => window.removeEventListener("keydown", handleWindowKeyDown);
  }, [keyboard, onClose, open]);

  /**
   * Forward the native cancel event through the controlled close callback.
   *
   * @param {React.SyntheticEvent<HTMLDialogElement>} event - Native dialog cancel event.
   * @returns {void}
   */
  const handleCancel = (event) => {
    event.preventDefault();
    if (keyboard) onClose?.();
  };

  /**
   * Close on a direct backdrop click while preserving static dialogs.
   *
   * @param {React.MouseEvent<HTMLDialogElement>} event - Native pointer event.
   * @returns {void}
   */
  const handleBackdropClick = (event) => {
    if (backdrop !== "static" && backdrop !== false && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ onClose, titleId }}>
      <dialog
        ref={dialogRef}
        className={`native-dialog ly-surface ${className}`.trim()}
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? undefined : titleId}
        data-dialog-size={size}
        data-dialog-placement={placement}
        onCancel={handleCancel}
        onClick={handleBackdropClick}
        {...restProps}
      >
        {children}
      </dialog>
    </DialogContext.Provider>
  );
};

/**
 * Render a dialog header and its native close control.
 *
 * @param {Object} props - Header configuration.
 * @param {boolean} [props.closeButton=true] - Whether to render the close button.
 * @param {string} [props.className=""] - Additional header classes.
 * @param {React.ReactNode} props.children - Header content.
 * @returns {JSX.Element} Dialog header.
 */
const DialogHeader = ({ closeButton = true, className = "", children }) => {
  const { onClose } = useContext(DialogContext);

  return (
    <header className={`native-dialog__header ${className}`.trim()}>
      {children}
      {closeButton ? (
        <button
          type="button"
          className="native-dialog__close interactive-surface"
          data-surface-variant="subtle"
          data-surface-level="1"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </header>
  );
};

/**
 * Render the accessible title associated with the parent dialog.
 *
 * @param {Object} props - Title configuration.
 * @param {string} [props.className=""] - Additional title classes.
 * @param {React.ReactNode} props.children - Title content.
 * @returns {JSX.Element} Dialog heading.
 */
const DialogTitle = ({ className = "", children, id = undefined }) => {
  const { titleId } = useContext(DialogContext);
  return (
    <h2 id={id || titleId} className={`native-dialog__title ${className}`.trim()}>
      {children}
    </h2>
  );
};

/**
 * Render the scrollable dialog body.
 *
 * @param {Object} props - Body configuration.
 * @param {string} [props.className=""] - Additional body classes.
 * @param {React.ReactNode} props.children - Body content.
 * @returns {JSX.Element} Dialog body.
 */
const DialogBody = ({ className = "", children, ...restProps }) => (
  <div className={`native-dialog__body ${className}`.trim()} {...restProps}>
    {children}
  </div>
);

/**
 * Render the dialog action footer.
 *
 * @param {Object} props - Footer configuration.
 * @param {string} [props.className=""] - Additional footer classes.
 * @param {React.ReactNode} props.children - Footer content.
 * @returns {JSX.Element} Dialog footer.
 */
const DialogFooter = ({ className = "", children, ...restProps }) => (
  <footer className={`native-dialog__footer ly-cluster ${className}`.trim()} {...restProps}>
    {children}
  </footer>
);

Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;

export default Dialog;
