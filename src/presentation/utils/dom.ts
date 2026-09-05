import { IconService } from "../../infrastructure/services/IconService";

/**
 * Safely triggers the IconService initialization inside a microtask/setTimeout
 * to ensure Lucide elements are parsed and styled correctly in the DOM.
 */
export function safeInitializeIcons(): void {
  try {
    setTimeout(() => {
      if (IconService && typeof IconService.initialize === "function") {
        IconService.initialize();
      }
    }, 0);
  } catch (err) {
    console.warn("Failed to initialize Lucide icons:", err);
  }
}

/**
 * Injects a stylesheet link element dynamically to document head if it doesn't already exist.
 * 
 * @param id Unique element identifier to avoid duplicate insertions.
 * @param url Link stylesheet source URL.
 */
export function injectStylesheet(id: string, url: string): void {
  if (!document.getElementById(id)) {
    const link = document.createElement("link") as HTMLLinkElement;
    link.id = id;
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}

export const DEFAULT_FALLBACK_IMAGE = "/assets/vinyl_record.jpg";

/**
 * Ensures asset path starts with a leading slash for Vite static root resolution
 */
export const resolveAssetPath = (path?: string): string => {
  if (!path || path.trim() === "") return DEFAULT_FALLBACK_IMAGE;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }
  return `/${path}`;
};
