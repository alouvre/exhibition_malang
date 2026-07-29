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
