/**
 * @file index.jsx
 * @fileoverview Color preferences modal for theme mode, palette, and high
 * contrast controls.
 * @module components/features/ColorMenu
 */

import { useCallback, useEffect, useState } from "react";
import { Modal } from "rsuite";
import { faArrowsRotate, faPalette } from "@fortawesome/free-solid-svg-icons";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";
import Btn from "components/ui/Btn";
import { Size, Variant } from "types/ui.types";
import ThemeToggle from "../ThemeToggle";
import PaletteToggle from "../PaletteToggle";
import "./styles.css";

const asOnOff = (value) => (value ? "On" : "Off");

function announceSettingChange(label, value) {
  return `${label} ${value ? "enabled" : "disabled"}. Select Apply changes to confirm.`;
}

function ColorSwitch({ labelledBy, checked, onChange, disabled = false }) {
  return (
    <label
      className={`color-switch interactive-surface ${checked ? "is-on" : ""} ${
        disabled ? "is-disabled" : ""
      }`}
    >
      <input
        className="color-switch__input"
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        aria-labelledby={labelledBy}
      />
      <span className="color-switch__track" aria-hidden="true">
        <span className="color-switch__thumb" />
      </span>
    </label>
  );
}

function ColorPreferenceRow({
  id,
  title,
  description,
  enabled,
  systemValue,
  overrideValue,
  onToggle,
  onUseSystem,
  disabled = false,
}) {
  const usesSystem = overrideValue === null;

  return (
    <div className="color-row">
      <div className="color-row__content">
        <h4 id={id} className="color-row__title">
          {title}
        </h4>
        <p className="color-row__description">{description}</p>
        <p className="color-row__mode">{usesSystem ? "Using system preference" : "Manual mode"}</p>
        <p className="color-row__system">System preference: {asOnOff(systemValue)}</p>
      </div>

      <div className="color-row__actions">
        <ColorSwitch labelledBy={id} checked={enabled} onChange={onToggle} disabled={disabled} />
        <Btn
          text="Use system"
          size={Size.XS}
          variant={Variant.SUBTLE}
          noBG
          disabled={disabled || usesSystem}
          ariaLabel={`${title}: use system setting`}
          onClick={onUseSystem}
          className="color-row__system-btn"
        />
      </div>
    </div>
  );
}

export default function ColorMenu({ size = Size.SM, showTooltip = true }) {
  const [open, setOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const { accessibilityOverrides, systemHighContrast, setHighContrastOverride } = useResponsive();
  const [draftHighContrast, setDraftHighContrast] = useState(accessibilityOverrides.highContrast);

  const blurActiveElement = useCallback(() => {
    if (typeof document === "undefined") return;
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }, []);

  const syncDraftFromCurrent = useCallback(() => {
    setDraftHighContrast(accessibilityOverrides.highContrast);
  }, [accessibilityOverrides.highContrast]);

  const announce = useCallback((message) => {
    setAnnouncement("");

    const updateLiveRegion = () => setAnnouncement(message);
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(updateLiveRegion);
      return;
    }

    setTimeout(updateLiveRegion, 0);
  }, []);

  const openMenu = useCallback(() => {
    syncDraftFromCurrent();
    setOpen(true);
  }, [syncDraftFromCurrent]);

  const closeMenu = useCallback(() => {
    if (isApplying) return;
    setOpen(false);
    blurActiveElement();
  }, [blurActiveElement, isApplying]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleEscapeClose = (event) => {
      if (event.defaultPrevented || event.key !== "Escape") return;
      if (!open || isApplying) return;
      closeMenu();
    };

    window.addEventListener("keydown", handleEscapeClose);
    return () => window.removeEventListener("keydown", handleEscapeClose);
  }, [closeMenu, isApplying, open]);

  const hasPendingChanges = draftHighContrast !== accessibilityOverrides.highContrast;
  const highContrastEnabled = draftHighContrast ?? systemHighContrast;

  const toggleHighContrast = useCallback(
    (value) => {
      setDraftHighContrast(Boolean(value));
      announce(announceSettingChange("High contrast", value));
    },
    [announce]
  );

  const useSystemHighContrast = useCallback(() => {
    setDraftHighContrast(null);
    announce(`High contrast set to system preference (${asOnOff(systemHighContrast)}).`);
  }, [announce, systemHighContrast]);

  const resetDraftToDefaults = useCallback(() => {
    setDraftHighContrast(null);
    announce("Draft reset to system defaults. Select Apply changes to confirm.");
  }, [announce]);

  const applyDraft = useCallback(async () => {
    if (!hasPendingChanges) return;

    setIsApplying(true);
    setHighContrastOverride(draftHighContrast);

    await new Promise((resolve) => {
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(() => resolve());
        return;
      }
      setTimeout(resolve, 0);
    });

    setIsApplying(false);
    setOpen(false);
    blurActiveElement();
    announce("Color preferences applied.");
  }, [announce, blurActiveElement, draftHighContrast, hasPendingChanges, setHighContrastOverride]);

  return (
    <>
      <span className="color-sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>

      <Btn
        icon={faPalette}
        size={size}
        variant={Variant.SECONDARY}
        noBG
        className="color-menu-trigger"
        ariaLabel="Open color settings"
        tooltip={showTooltip ? "Open color settings" : undefined}
        onClick={openMenu}
      />

      <Modal
        open={open}
        onClose={closeMenu}
        overflow={false}
        size="sm"
        className="color-modal modal-glass"
      >
        <Modal.Header>
          <Modal.Title>Color Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body className="color-modal__body modal-body-pad">
          <p className="color-modal__intro">
            Select mode and palette styles for this device. Theme and palette changes apply
            immediately.
          </p>

          <div className="color-panel">
            <h4 className="color-row__title">Theme Mode</h4>
            <ThemeToggle size={Size.SM} />
          </div>

          <div className="color-panel color-panel--palette">
            <h4 className="color-row__title">Palette</h4>
            <PaletteToggle size={Size.SM} showLabel={false} ariaLabel="Color palette" />
          </div>

          <ColorPreferenceRow
            id="color-high-contrast"
            title="High contrast"
            description="Increase contrast strength for text and focus states."
            enabled={highContrastEnabled}
            onToggle={toggleHighContrast}
            onUseSystem={useSystemHighContrast}
            overrideValue={draftHighContrast}
            systemValue={systemHighContrast}
            disabled={isApplying}
          />
        </Modal.Body>

        <Modal.Footer className="color-modal__footer">
          <Btn
            text="Reset draft"
            icon={faArrowsRotate}
            size={Size.SM}
            variant={Variant.ACCENT}
            ariaLabel="Reset draft color preferences"
            disabled={isApplying || !hasPendingChanges}
            onClick={resetDraftToDefaults}
          />
          <Btn
            text="Close"
            size={Size.SM}
            variant={Variant.SUBTLE}
            ariaLabel="Close color settings"
            disabled={isApplying}
            onClick={closeMenu}
          />
          <Btn
            text={isApplying ? "Applying..." : "Apply changes"}
            size={Size.SM}
            variant={Variant.PRIMARY}
            ariaLabel="Apply color changes"
            loading={isApplying}
            disabled={isApplying || !hasPendingChanges}
            onClick={applyDraft}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
