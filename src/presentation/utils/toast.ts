/**
 * Dispatches a global show-toast event with the specified message.
 * Utilized by components to communicate notifications to the main view shell.
 * 
 * @param message Toast message content to display.
 */
export function showGlobalToast(message: string): void {
  window.dispatchEvent(
    new CustomEvent("show-toast", { detail: message })
  );
}
