/**
 * @file src\components\features\index.js
 * @description src\components\features\index module.
 * @module src\components\features\index
 */

import { lazy } from "react";

const ResumePreviewModal = lazy(() => import("./ResumePreview/ResumePreviewModal"));
const PreviewResume = lazy(() => import("./ResumePreview"));
const ThemeToggle = lazy(() => import("./ThemeToggle"));
const PaletteToggle = lazy(() => import("./PaletteToggle"));
const AccessibilityMenu = lazy(() => import("./AccessibilityMenu"));

export { ResumePreviewModal, PreviewResume, ThemeToggle, PaletteToggle, AccessibilityMenu };
