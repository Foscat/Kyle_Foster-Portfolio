/**
 * @file index.jsx
 * @fileoverview Accessibility preferences modal for toggling motion, contrast,
 * text size, and keyboard guidance with persisted client-side settings.
 * @module components/features/AccessibilityMenu
 */

import { useCallback, useEffect, useState } from "react";
import { Modal } from "rsuite";
import { faArrowsRotate, faUniversalAccess } from "@fortawesome/free-solid-svg-icons";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";
import Btn from "components/ui/Btn";
import { Size, Variant } from "types/ui.types";
import ThemeToggle from "../ThemeToggle";
import "./styles.css";

const asOnOff = (value) => (value ? "On" : "Off");
const HOTKEY_LABEL = "Alt+A";

const isEditableTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");

const announceSettingChange = (label, value) => `${label} ${value ? "enabled" : "disabled"}.`;

function A11ySwitch({ labelledBy, checked, onChange, disabled = false }) {
  return (
    <label
      className={`a11y-switch interactive-surface ${checked ? "is-on" : ""} ${
        disabled ? "is-disabled" : ""
      }`}
    >
      <input
        className="a11y-switch__input"
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        aria-labelledby={labelledBy}
      />
      <span className="a11y-switch__track" aria-hidden="true">
        <span className="a11y-switch__thumb" />
      </span>
    </label>
  );
}

function PreferenceRow({
  id,
  title,
  description,
  enabled,
  systemValue,
  overrideValue,
  onToggle,
  onUseSystem,
  supportsSystem = true,
  disabled = false,
}) {
  const usesSystem = supportsSystem && overrideValue === null;

  return (
    <div className="a11y-row">
      <div className="a11y-row__content">
        <h4 id={id} className="a11y-row__title">
          {title}
        </h4>
        <p className="a11y-row__description">{description}</p>
        {supportsSystem ? (
          <>
            <p className="a11y-row__mode">
              {usesSystem ? "Using system preference" : "Manual override"}
            </p>
            <p className="a11y-row__system">System preference: {asOnOff(systemValue)}</p>
          </>
        ) : null}
      </div>

      <div className="a11y-row__actions">
        <A11ySwitch labelledBy={id} checked={enabled} onChange={onToggle} disabled={disabled} />
        {supportsSystem && onUseSystem ? (
          <Btn
            text="Use system"
            size={Size.XS}
            variant={Variant.SUBTLE}
            noBG
            disabled={disabled || usesSystem}
            ariaLabel={`${title}: use system setting`}
            onClick={onUseSystem}
            className="a11y-row__system-btn"
          />
        ) : null}
      </div>
    </div>
  );
}

export default function AccessibilityMenu({ size = Size.SM, enableHotkey = false }) {
  const [open, setOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const {
    largeText,
    accessibilityOverrides,
    systemReducedMotion,
    systemReducedTransparency,
    systemHighContrast,
    setReducedMotionOverride,
    setReducedTransparencyOverride,
    setHighContrastOverride,
    setLargeTextEnabled,
    hasAccessibilityOverrides,
  } = useResponsive();
  const [draft, setDraft] = useState({
    largeText: false,
    reducedMotion: null,
    reducedTransparency: null,
    highContrast: null,
  });

  const syncDraftFromCurrent = useCallback(() => {
    setDraft({
      largeText: largeText,
      reducedMotion: accessibilityOverrides.reducedMotion,
      reducedTransparency: accessibilityOverrides.reducedTransparency,
      highContrast: accessibilityOverrides.highContrast,
    });
  }, [
    largeText,
    accessibilityOverrides.reducedMotion,
    accessibilityOverrides.reducedTransparency,
    accessibilityOverrides.highContrast,
  ]);

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
  }, [isApplying]);

  useEffect(() => {
    if (!enableHotkey || typeof window === "undefined") return undefined;

    const handleHotkey = (event) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;
      if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key.toLowerCase() !== "a") return;

      event.preventDefault();
      openMenu();
      announce(`Accessibility settings opened. Shortcut: ${HOTKEY_LABEL}.`);
    };

    window.addEventListener("keydown", handleHotkey);
    return () => window.removeEventListener("keydown", handleHotkey);
  }, [announce, enableHotkey, openMenu]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleEscapeClose = (event) => {
      if (event.defaultPrevented || event.key !== "Escape") return;
      if (!open || isApplying) return;
      setOpen(false);
    };

    window.addEventListener("keydown", handleEscapeClose);
    return () => window.removeEventListener("keydown", handleEscapeClose);
  }, [isApplying, open]);

  const resolveSetting = useCallback((override, systemValue) => override ?? systemValue, []);

  const toggleReducedMotion = useCallback(
    (value) => {
      setDraft((prev) => ({ ...prev, reducedMotion: Boolean(value) }));
      announce(`${announceSettingChange("Reduce motion", value)} Select Apply changes to confirm.`);
    },
    [announce]
  );

  const toggleReducedTransparency = useCallback(
    (value) => {
      setDraft((prev) => ({ ...prev, reducedTransparency: Boolean(value) }));
      announce(
        `${announceSettingChange("Reduce transparency", value)} Select Apply changes to confirm.`
      );
    },
    [announce]
  );

  const toggleHighContrast = useCallback(
    (value) => {
      setDraft((prev) => ({ ...prev, highContrast: Boolean(value) }));
      announce(`${announceSettingChange("High contrast", value)} Select Apply changes to confirm.`);
    },
    [announce]
  );

  const toggleLargeText = useCallback(
    (value) => {
      setDraft((prev) => ({ ...prev, largeText: Boolean(value) }));
      announce(`${announceSettingChange("Large text", value)} Select Apply changes to confirm.`);
    },
    [announce]
  );

  const useSystemReducedMotion = useCallback(() => {
    setDraft((prev) => ({ ...prev, reducedMotion: null }));
    announce(`Reduce motion set to system preference (${asOnOff(systemReducedMotion)}).`);
  }, [announce, systemReducedMotion]);

  const useSystemReducedTransparency = useCallback(() => {
    setDraft((prev) => ({ ...prev, reducedTransparency: null }));
    announce(
      `Reduce transparency set to system preference (${asOnOff(systemReducedTransparency)}).`
    );
  }, [announce, systemReducedTransparency]);

  const useSystemHighContrast = useCallback(() => {
    setDraft((prev) => ({ ...prev, highContrast: null }));
    announce(`High contrast set to system preference (${asOnOff(systemHighContrast)}).`);
  }, [announce, systemHighContrast]);

  const resetDraftToDefaults = useCallback(() => {
    setDraft({
      largeText: false,
      reducedMotion: null,
      reducedTransparency: null,
      highContrast: null,
    });
    announce("Draft reset to system defaults. Select Apply changes to confirm.");
  }, [announce]);

  const hasPendingChanges =
    draft.largeText !== largeText ||
    draft.reducedMotion !== accessibilityOverrides.reducedMotion ||
    draft.reducedTransparency !== accessibilityOverrides.reducedTransparency ||
    draft.highContrast !== accessibilityOverrides.highContrast;

  const applyDraft = useCallback(async () => {
    if (!hasPendingChanges) return;

    setIsApplying(true);
    setReducedMotionOverride(draft.reducedMotion);
    setReducedTransparencyOverride(draft.reducedTransparency);
    setHighContrastOverride(draft.highContrast);
    setLargeTextEnabled(draft.largeText);

    // Allow one paint for the new CSS variables/data-attrs before ending loading.
    await new Promise((resolve) => {
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(() => resolve());
        return;
      }
      setTimeout(resolve, 0);
    });

    setIsApplying(false);
    setOpen(false);
    announce("Accessibility changes applied.");
  }, [
    announce,
    draft.highContrast,
    draft.largeText,
    draft.reducedMotion,
    draft.reducedTransparency,
    hasPendingChanges,
    setHighContrastOverride,
    setLargeTextEnabled,
    setReducedMotionOverride,
    setReducedTransparencyOverride,
  ]);

  return (
    <>
      <span className="a11y-sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>

      <Btn
        icon={faUniversalAccess}
        size={size}
        variant={Variant.PRIMARY}
        noBG
        className="a11y-menu-trigger"
        ariaLabel="Open accessibility settings"
        tooltip={`Accessibility settings (${HOTKEY_LABEL})`}
        onClick={openMenu}
      />

      <Modal open={open} onClose={closeMenu} size="sm" className="a11y-modal modal-glass">
        <Modal.Header>
          <Modal.Title>Accessibility Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body className="a11y-modal__body modal-body-pad">
          <p className="a11y-modal__intro">
            Adjust readability, motion, and contrast settings. Preferences are saved on this device.
          </p>
          <p className="a11y-modal__hotkey">Keyboard shortcut: {HOTKEY_LABEL}</p>
          <section className="a11y-keyboard" aria-label="Keyboard navigation help">
            <h4 className="a11y-row__title">Keyboard Navigation</h4>
            <ul className="a11y-keyboard__list">
              <li>
                <kbd>Tab</kbd>: move to the next available display block. If you reach the end of a
                section, focus moves to the first block of the next section.
              </li>
              <li>
                <kbd>Shift+Tab</kbd>: move to the previous available display block. If you are at
                the start of a section, focus moves to the first block of the previous section.
              </li>
              <li>
                <kbd>Enter</kbd>/<kbd>Alt+Enter</kbd>: close current section and move to the next or
                previous section's first block.
              </li>
              <li>
                <kbd>ArrowRight</kbd>/<kbd>ArrowLeft</kbd>: move to next/previous block and collapse
                the previous section.
              </li>
              <li>
                <kbd>ArrowDown</kbd>/<kbd>ArrowUp</kbd>: normal page scroll behavior. When the
                active block is an accordion list, moves one accordion item at a time (opens
                next/previous, closes the last open item).
              </li>
              <li>
                <kbd>Ctrl</kbd>: open site navigation.
              </li>
              <li>
                <kbd>Esc</kbd>: close any open drawer or modal. <kbd>{HOTKEY_LABEL}</kbd>: open
                accessibility settings. Section navigation on mobile uses its on-screen button.
              </li>
            </ul>
          </section>

          <div className="a11y-rows">
            <PreferenceRow
              id="a11y-large-text"
              title="Large text"
              description="Increase text scale for improved readability."
              enabled={draft.largeText}
              onToggle={toggleLargeText}
              overrideValue={draft.largeText}
              supportsSystem={false}
              disabled={isApplying}
            />

            <PreferenceRow
              id="a11y-reduced-motion"
              title="Reduce motion"
              description="Limit animations and transitions across the interface."
              enabled={resolveSetting(draft.reducedMotion, systemReducedMotion)}
              onToggle={toggleReducedMotion}
              onUseSystem={useSystemReducedMotion}
              overrideValue={draft.reducedMotion}
              systemValue={systemReducedMotion}
              disabled={isApplying}
            />

            <PreferenceRow
              id="a11y-reduced-transparency"
              title="Reduce transparency"
              description="Remove blur/transparency effects for stronger legibility."
              enabled={resolveSetting(draft.reducedTransparency, systemReducedTransparency)}
              onToggle={toggleReducedTransparency}
              onUseSystem={useSystemReducedTransparency}
              overrideValue={draft.reducedTransparency}
              systemValue={systemReducedTransparency}
              disabled={isApplying}
            />

            <PreferenceRow
              id="a11y-high-contrast"
              title="High contrast"
              description="Increase contrast strength for text and focus states."
              enabled={resolveSetting(draft.highContrast, systemHighContrast)}
              onToggle={toggleHighContrast}
              onUseSystem={useSystemHighContrast}
              overrideValue={draft.highContrast}
              systemValue={systemHighContrast}
              disabled={isApplying}
            />
          </div>

          <div className="a11y-theme">
            <h4 className="a11y-row__title">Theme</h4>
            <ThemeToggle size={Size.SM} />
          </div>
        </Modal.Body>

        <Modal.Footer className="a11y-modal__footer">
          <Btn
            text="Reset draft"
            icon={faArrowsRotate}
            size={Size.SM}
            variant={Variant.ACCENT}
            ariaLabel="Reset draft accessibility preferences"
            disabled={isApplying || (!hasPendingChanges && !hasAccessibilityOverrides)}
            onClick={resetDraftToDefaults}
          />
          <Btn
            text="Close"
            size={Size.SM}
            variant={Variant.SUBTLE}
            ariaLabel="Close accessibility settings"
            disabled={isApplying}
            onClick={closeMenu}
          />
          <Btn
            text={isApplying ? "Applying..." : "Apply changes"}
            size={Size.SM}
            variant={Variant.PRIMARY}
            ariaLabel="Apply accessibility changes"
            loading={isApplying}
            disabled={isApplying || !hasPendingChanges}
            onClick={applyDraft}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
