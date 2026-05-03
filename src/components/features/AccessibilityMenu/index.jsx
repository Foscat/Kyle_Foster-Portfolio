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
import "./styles.css";

const asOnOff = (value) => (value ? "On" : "Off");
const HOTKEY_LABEL = "Alt+A";
const TEXT_SCALE_MIN = 1;
const TEXT_SCALE_MAX = 1.3;
const TEXT_SCALE_STEP = 0.05;
const KEYBOARD_NAV_KEYS = new Set([
  "Tab",
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
  "Control",
  "Alt",
]);

const isEditableTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");

const announceSettingChange = (label, value) => `${label} ${value ? "enabled" : "disabled"}.`;
const clampTextScale = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return TEXT_SCALE_MIN;

  const clamped = Math.min(TEXT_SCALE_MAX, Math.max(TEXT_SCALE_MIN, numeric));
  return Math.round(clamped * 100) / 100;
};
const formatTextScale = (value) => `${Math.round(clampTextScale(value) * 100)}%`;

/**
 * @component A11ySwitch
 * @description A custom switch component for toggling accessibility preferences, built with an underlying checkbox input for accessibility.
 * @prop {string} labelledBy - The id of the element that labels this switch, used for aria-labelledby.
 * @prop {boolean} checked - Whether the switch is currently on (checked) or off (unchecked).
 * @prop {function} onChange - Callback function that is called with the new checked state when the switch is toggled.
 * @prop {boolean} disabled - Whether the switch is disabled and non-interactive.
 * @returns {JSX.Element} The rendered switch component.
 */
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

/**
 * @component PreferenceRow
 * @description A single row in the accessibility menu for toggling a specific preference.
 * @prop {string} id - Unique identifier for the preference, used for accessibility labeling.
 * @prop {string} title - The display name of the preference.
 * @prop {string} description - A brief explanation of what the preference does.
 * @prop {boolean} enabled - Whether the preference is currently enabled (based on draft state).
 * @prop {boolean|null} systemValue - The current value of the preference according to system settings (if supported).
 * @prop {boolean|null} overrideValue - The manually selected override value, or null when using the system preference.
 * @prop {function(boolean): void} onToggle - Called when the preference switch is toggled.
 * @prop {function(): void} [onUseSystem] - Called when the user chooses to revert to the system preference.
 * @prop {boolean} [supportsSystem=true] - Whether this preference can follow a system-level setting.
 * @prop {boolean} [disabled=false] - Whether the row controls are disabled.
 * @returns {JSX.Element} The rendered preference row component.
 */
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

function TextScaleRow({ id, title, description, value, onChange, disabled = false }) {
  const descriptionId = `${id}-description`;
  const valueId = `${id}-value`;
  const normalizedScale = clampTextScale(value);

  return (
    <div className="a11y-row">
      <div className="a11y-row__content">
        <h4 id={id} className="a11y-row__title">
          {title}
        </h4>
        <p id={descriptionId} className="a11y-row__description">
          {description}
        </p>
      </div>

      <div className="a11y-row__actions a11y-row__actions--scale">
        <div className="a11y-scale">
          <label className="a11y-sr-only" htmlFor={`${id}-input`}>
            {title}
          </label>
          <input
            id={`${id}-input`}
            type="range"
            className="a11y-scale__input"
            min={TEXT_SCALE_MIN}
            max={TEXT_SCALE_MAX}
            step={TEXT_SCALE_STEP}
            value={normalizedScale}
            disabled={disabled}
            onChange={(event) => onChange(event.target.value)}
            aria-labelledby={id}
            aria-describedby={`${descriptionId} ${valueId}`}
          />
          <output id={valueId} className="a11y-scale__value" htmlFor={`${id}-input`}>
            {formatTextScale(normalizedScale)}
          </output>
        </div>
      </div>
    </div>
  );
}

/**
 * @component AccessibilityMenu
 * @description A menu component for managing accessibility preferences.
 * @prop {string} size - The size of the menu.
 * @prop {boolean} enableHotkey - Whether to enable the hotkey for opening the menu.
 * @prop {boolean} showTooltip - Whether to show tooltips for the menu items.
 * @returns {JSX.Element} The rendered accessibility menu component.
 */
export default function AccessibilityMenu({
  size = Size.SM,
  enableHotkey = false,
  showTooltip = true,
}) {
  const [open, setOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [isTouchFirstDevice, setIsTouchFirstDevice] = useState(false);
  const [hasKeyboardInteraction, setHasKeyboardInteraction] = useState(false);
  const {
    textScale,
    accessibilityOverrides,
    systemReducedMotion,
    systemReducedTransparency,
    systemHighContrast,
    setReducedMotionOverride,
    setReducedTransparencyOverride,
    setHighContrastOverride,
    setTextScale,
    hasAccessibilityOverrides,
  } = useResponsive();
  const [draft, setDraft] = useState({
    textScale: TEXT_SCALE_MIN,
    reducedMotion: null,
    reducedTransparency: null,
    highContrast: null,
  });

  /*
   * @description Utility to blur the currently active element, used when closing the menu to prevent focus from remaining on a now-invisible element. Checks for document and HTMLElement to ensure compatibility with SSR and non-browser environments.
   */
  const blurActiveElement = useCallback(() => {
    if (typeof document === "undefined") return;
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }, []);

  /*
   * @description Sync the draft state with the current effective settings (considering both overrides and system preferences) when opening the menu, so that the toggles reflect the current state accurately.
   */
  const syncDraftFromCurrent = useCallback(() => {
    setDraft({
      textScale: textScale,
      reducedMotion: accessibilityOverrides.reducedMotion,
      reducedTransparency: accessibilityOverrides.reducedTransparency,
      highContrast: accessibilityOverrides.highContrast,
    });
  }, [
    textScale,
    accessibilityOverrides.reducedMotion,
    accessibilityOverrides.reducedTransparency,
    accessibilityOverrides.highContrast,
  ]);

  const announce = useCallback((message) => {
    setAnnouncement("");

    /*
     * @function updateLiveRegion
     * @description Use requestAnimationFrame to ensure that the live region update occurs in a separate frame, allowing screen readers to detect the change and announce the new message. If requestAnimationFrame is not available (e.g., in older browsers), fall back to a setTimeout with a short delay. This technique helps ensure that announcements are reliably made for screen reader users when the message changes.
     */
    const updateLiveRegion = () => setAnnouncement(message);
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(updateLiveRegion);
      return;
    }

    setTimeout(updateLiveRegion, 0);
  }, []);

  const openMenu = useCallback(
    (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      syncDraftFromCurrent();
      setOpen(true);
    },
    [syncDraftFromCurrent]
  );

  const closeMenu = useCallback(() => {
    if (isApplying) return;
    setOpen(false);
    blurActiveElement();
  }, [blurActiveElement, isApplying]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const hoverNoneQuery = window.matchMedia("(hover: none)");

    /*
     * @description Determine if the device is touch-first based on pointer and hover capabilities, and update the state accordingly. This helps in deciding whether to show keyboard navigation help, as touch-first devices may not benefit from it.
     */
    const evaluateInputProfile = () => {
      const hasTouchPoints = navigator.maxTouchPoints > 0;
      const isCoarse = coarseQuery.matches;
      const hasNoHover = hoverNoneQuery.matches;

      setIsTouchFirstDevice(hasTouchPoints || (isCoarse && hasNoHover));
    };

    evaluateInputProfile();

    const updateProfile = () => evaluateInputProfile();

    coarseQuery.addEventListener?.("change", updateProfile);
    hoverNoneQuery.addEventListener?.("change", updateProfile);

    // Legacy Safari fallback
    coarseQuery.addListener?.(updateProfile);
    hoverNoneQuery.addListener?.(updateProfile);

    return () => {
      coarseQuery.removeEventListener?.("change", updateProfile);
      hoverNoneQuery.removeEventListener?.("change", updateProfile);
      coarseQuery.removeListener?.(updateProfile);
      hoverNoneQuery.removeListener?.(updateProfile);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || hasKeyboardInteraction) return undefined;

    /*
     * @function detectKeyboardUse
     * @description Listen for keydown events to detect if the user is interacting with the keyboard. This is used to determine whether to show keyboard navigation help in the menu. The listener ignores events that are prevented, originate from editable elements, or involve keys that are not typically used for navigation (as defined in KEYBOARD_NAV_KEYS).
     */
    const detectKeyboardUse = (event) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;
      if (!KEYBOARD_NAV_KEYS.has(event.key)) return;

      setHasKeyboardInteraction(true);
    };

    window.addEventListener("keydown", detectKeyboardUse);
    return () => window.removeEventListener("keydown", detectKeyboardUse);
  }, [hasKeyboardInteraction]);

  useEffect(() => {
    if (!enableHotkey || typeof window === "undefined") return undefined;

    const handleHotkey = (event) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;
      if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key.toLowerCase() !== "a") return;

      event.preventDefault();
      setHasKeyboardInteraction(true);
      openMenu();
      announce(`Accessibility settings opened. Shortcut: ${HOTKEY_LABEL}.`);
    };

    window.addEventListener("keydown", handleHotkey);
    return () => window.removeEventListener("keydown", handleHotkey);
  }, [announce, enableHotkey, openMenu]);

  /*
   * @description Listen for `Escape` key presses to close the menu when it's open, unless changes are currently being applied. This provides a convenient way for users to exit the menu using the keyboard.
   */
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

  const resolveSetting = useCallback((override, systemValue) => override ?? systemValue, []);

  /*
   * @function togglePreference
   * @description A generic function to toggle an accessibility preference in the draft state and announce the change. This function is used by the specific toggle handlers for each preference (motion, transparency, contrast, text size) to update the draft state and provide feedback to screen reader users about the change and the need to apply changes to confirm.
   */
  const toggleReducedMotion = useCallback(
    (value) => {
      setDraft((prev) => ({ ...prev, reducedMotion: Boolean(value) }));
      announce(`${announceSettingChange("Reduce motion", value)} Select Apply changes to confirm.`);
    },
    [announce]
  );

  /*
   * @function toggleReducedTransparency
   * @description Toggle the reduced transparency preference in the draft state and announce the change. This function updates the draft state for reduced transparency and provides feedback to screen reader users about the new state of the preference, along with a reminder to apply changes to confirm.
   */
  const toggleReducedTransparency = useCallback(
    (value) => {
      setDraft((prev) => ({ ...prev, reducedTransparency: Boolean(value) }));
      announce(
        `${announceSettingChange("Reduce transparency", value)} Select Apply changes to confirm.`
      );
    },
    [announce]
  );

  /*
   * @function toggleHighContrast
   * @description Toggle the high contrast preference in the draft state and announce the change. This function updates the draft state for high contrast and provides feedback to screen reader users about the new state of the preference, along with a reminder to apply changes to confirm.
   */
  const toggleHighContrast = useCallback(
    (value) => {
      setDraft((prev) => ({ ...prev, highContrast: Boolean(value) }));
      announce(`${announceSettingChange("High contrast", value)} Select Apply changes to confirm.`);
    },
    [announce]
  );

  /*
   * @function updateTextScale
   * @description Update the draft text scale preference and announce the new percentage value. The value is clamped to the supported range before being stored.
   */
  const updateTextScale = useCallback(
    (value) => {
      const nextScale = clampTextScale(value);
      setDraft((prev) => ({ ...prev, textScale: nextScale }));
      announce(`Text size set to ${formatTextScale(nextScale)}. Select Apply changes to confirm.`);
    },
    [announce]
  );

  /*
   * @function useSystemPreference
   * @description A generic function to set a preference in the draft state to null, which indicates that the system preference should be used. This function is used by the specific handlers for each preference (motion, transparency, contrast) to update the draft state and provide feedback to screen reader users about switching to the system preference and what that preference currently is.
   */
  const useSystemReducedMotion = useCallback(() => {
    setDraft((prev) => ({ ...prev, reducedMotion: null }));
    announce(`Reduce motion set to system preference (${asOnOff(systemReducedMotion)}).`);
  }, [announce, systemReducedMotion]);

  /*
   * @function useSystemReducedTransparency
   * @description Set the reduced transparency preference in the draft state to null to indicate using the system preference, and announce the change. This function updates the draft state for reduced transparency to use the system setting and provides feedback to screen reader users about the switch and the current state of the system preference.
   */
  const useSystemReducedTransparency = useCallback(() => {
    setDraft((prev) => ({ ...prev, reducedTransparency: null }));
    announce(
      `Reduce transparency set to system preference (${asOnOff(systemReducedTransparency)}).`
    );
  }, [announce, systemReducedTransparency]);

  /*
   * @function useSystemHighContrast
   * @description Set the high contrast preference in the draft state to null to indicate using the system preference, and announce the change. This function updates the draft state for high contrast to use the system setting and provides feedback to screen reader users about the switch and the current state of the system preference.
   */
  const useSystemHighContrast = useCallback(() => {
    setDraft((prev) => ({ ...prev, highContrast: null }));
    announce(`High contrast set to system preference (${asOnOff(systemHighContrast)}).`);
  }, [announce, systemHighContrast]);

  /*
   * @function resetDraftToDefaults
   * @description Reset all preferences in the draft state to their default values (100% text size and system defaults for toggles) and announce the reset action. This function allows users to quickly revert all changes in the draft state back to defaults, and provides feedback to screen reader users that the draft has been reset and that they need to apply changes to confirm.
   */
  const resetDraftToDefaults = useCallback(() => {
    setDraft({
      textScale: TEXT_SCALE_MIN,
      reducedMotion: null,
      reducedTransparency: null,
      highContrast: null,
    });
    announce("Draft reset to system defaults. Select Apply changes to confirm.");
  }, [announce]);

  const hasPendingChanges =
    Math.abs(draft.textScale - textScale) > 0.001 ||
    draft.reducedMotion !== accessibilityOverrides.reducedMotion ||
    draft.reducedTransparency !== accessibilityOverrides.reducedTransparency ||
    draft.highContrast !== accessibilityOverrides.highContrast;

  const showKeyboardNavigationHelp = !isTouchFirstDevice || hasKeyboardInteraction;

  /*
   * @function applyDraft
   * @description Apply the changes from the draft state to the actual settings by calling the appropriate setter functions for each preference. This function sets an "applying" state to disable interactions while changes are being applied, updates each preference based on the draft state, and then waits for a paint to occur before re-enabling interactions and closing the menu. Finally, it announces that the changes have been applied for screen reader users.
   */
  const applyDraft = useCallback(async () => {
    if (!hasPendingChanges) return;

    setIsApplying(true);
    setReducedMotionOverride(draft.reducedMotion);
    setReducedTransparencyOverride(draft.reducedTransparency);
    setHighContrastOverride(draft.highContrast);
    setTextScale(draft.textScale);

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
    blurActiveElement();
    announce("Accessibility changes applied.");
  }, [
    blurActiveElement,
    announce,
    draft.highContrast,
    draft.textScale,
    draft.reducedMotion,
    draft.reducedTransparency,
    hasPendingChanges,
    setHighContrastOverride,
    setTextScale,
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
        tooltip={showTooltip ? `Accessibility settings (${HOTKEY_LABEL})` : undefined}
        onClick={openMenu}
      />

      <Modal
        open={open}
        onClose={closeMenu}
        overflow={false}
        size="sm"
        className="a11y-modal modal-glass"
      >
        <Modal.Header>
          <Modal.Title>Accessibility Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body className="a11y-modal__body modal-body-pad">
          <p className="a11y-modal__intro">
            Adjust readability, motion, and contrast settings. Preferences are saved on this device.
          </p>
          {showKeyboardNavigationHelp ? (
            <>
              <p className="a11y-modal__hotkey">Keyboard shortcut: {HOTKEY_LABEL}</p>
              <section className="a11y-keyboard" aria-label="Keyboard navigation help">
                <h4 className="a11y-row__title">Keyboard Navigation</h4>
                <ul className="a11y-keyboard__list">
                  <li>
                    <kbd>Tab</kbd>: move to the next focusable control using standard keyboard
                    navigation.
                  </li>
                  <li>
                    <kbd>Shift+Tab</kbd>: move to the previous focusable control. When focus is in
                    section navigation, it can move to the previous available display block.
                  </li>
                  <li>
                    <kbd>Enter</kbd>/<kbd>Alt+Enter</kbd>: close current section and move to the
                    next or previous section's first block.
                  </li>
                  <li>
                    <kbd>ArrowRight</kbd>/<kbd>ArrowLeft</kbd>: move to next/previous block and
                    collapse the previous section.
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
            </>
          ) : null}

          <div className="a11y-rows">
            <TextScaleRow
              id="a11y-text-scale"
              title="Text size"
              description="Adjust text scale across the interface for readability."
              value={draft.textScale}
              onChange={updateTextScale}
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
