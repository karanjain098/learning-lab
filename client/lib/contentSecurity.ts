/**
 * Content Security & Protection Utilities
 * Implements copy prevention, watermarking, and download restrictions
 */

/**
 * Disable text selection and copy on locked elements
 */
export const disableCopyProtection = () => {
  const style = document.createElement("style");
  style.textContent = `
    .locked-content {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
    .locked-content *,
    .locked-content *::before,
    .locked-content *::after {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Handle copy events and prevent copying from locked content
 */
export const setupCopyProtection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.addEventListener("copy", (e) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  });

  element.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  element.addEventListener("selectstart", (e) => {
    e.preventDefault();
  });
};

/**
 * Prevent download links in locked content
 */
export const disableDownload = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Disable right-click download
  element.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // Disable drag-and-drop
  element.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  // Disable keyboard shortcuts (Ctrl+S, Cmd+S)
  element.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
      e.preventDefault();
    }
  });
};

/**
 * Generate dynamic watermark with user info
 */
export const addDynamicWatermark = (
  elementId: string,
  userName: string,
  userId: string,
): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const watermarkText = `${userName} (ID: ${userId}) - ${new Date().toLocaleDateString()}`;

  // Create watermark overlay
  const watermark = document.createElement("div");
  watermark.className = "content-watermark";
  watermark.textContent = watermarkText;
  watermark.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 48px;
    font-weight: bold;
    color: rgba(200, 200, 200, 0.3);
    white-space: nowrap;
    pointer-events: none;
    z-index: 9999;
    width: 200%;
    height: 200%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  element.style.position = "relative";
  element.appendChild(watermark);
};

/**
 * Prevent image download
 */
export const protectImage = (elementId: string): void => {
  const img = document.getElementById(elementId) as HTMLImageElement;
  if (!img) return;

  // Disable right-click
  img.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  // Disable drag
  img.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
  });

  // Add CSS to prevent selection
  img.style.userSelect = "none";
  img.style.WebkitUserSelect = "none";
  img.style.MozUserSelect = "none";
  img.style.msUserSelect = "none";
};

/**
 * Protect video from download
 */
export const protectVideo = (elementId: string): void => {
  const video = document.getElementById(elementId) as HTMLVideoElement;
  if (!video) return;

  // Remove download attribute
  video.removeAttribute("download");
  video.controlsList.add("nodownload");
  video.controlsList.add("nofullscreen");

  // Disable right-click
  video.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });
};

/**
 * Keyboard shortcut handler for locked content
 */
export const setupKeyboardProtection = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.addEventListener("keydown", (e: KeyboardEvent) => {
    // Prevent Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+S
    if (e.ctrlKey || e.metaKey) {
      if (["c", "x", "a", "s", "C", "X", "A", "S"].includes(e.key)) {
        e.preventDefault();
      }
    }

    // Prevent F12 (developer tools)
    if (e.key === "F12") {
      e.preventDefault();
    }
  });
};

/**
 * Apply browser cache prevention headers (client-side simulation)
 */
export const preventBrowserCache = (): void => {
  // This prevents browser from caching sensitive content
  const meta = document.createElement("meta");
  meta.httpEquiv = "Cache-Control";
  meta.content = "no-cache, no-store, must-revalidate";
  document.head.appendChild(meta);

  const meta2 = document.createElement("meta");
  meta2.httpEquiv = "Pragma";
  meta2.content = "no-cache";
  document.head.appendChild(meta2);

  const meta3 = document.createElement("meta");
  meta3.httpEquiv = "Expires";
  meta3.content = "0";
  document.head.appendChild(meta3);
};

/**
 * Apply all protection measures to an element
 */
export const applyFullProtection = (
  elementId: string,
  userName: string,
  userId: string,
): void => {
  disableCopyProtection();
  setupCopyProtection(elementId);
  disableDownload(elementId);
  setupKeyboardProtection(elementId);
  addDynamicWatermark(elementId, userName, userId);
};
