import { lazy } from "react";

const ResumePreviewModal = lazy(() => import("./ResumePreview/ResumePreviewModal"));
const PreviewResume = lazy(() => import("./ResumePreview"));
const ThemeToggle = lazy(() => import("./ThemeToggle"));
const AccessibilityMenu = lazy(() => import("./AccessibilityMenu"));

export { ResumePreviewModal, PreviewResume, ThemeToggle, AccessibilityMenu };
