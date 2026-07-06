import { getProvider } from "~/providers/registry";
import { browser } from "wxt/browser";
import type { MessageType } from "~/types/messages";

export default defineContentScript({
  matches: ["<all_urls>"],

  main() {
    console.log("🚀 JobFlow Content Script Active");

    const provider = getProvider(new URL(globalThis.location.href));
    if (!provider) return;

    console.log(`[JobFlow] Supported Provider Detected: ${provider.name}`);

    // Set up application detector
    provider.onApplicationSubmitted(async () => {
      console.log(`[JobFlow] Application Submitted on ${provider.name}! Extracting data...`);
      
      const job = provider.extractJob();
      if (!job) {
        console.error("[JobFlow] Failed to extract job data on submission.");
        return;
      }

      console.log("[JobFlow] Extracted Job:", job);

      // Send to background script for storage and notification
      const message: MessageType = { type: 'APPLICATION_SUBMITTED', payload: job };
      
      try {
        await browser.runtime.sendMessage(message);
        console.log("[JobFlow] Successfully dispatched APPLICATION_SUBMITTED message.");
      } catch (err) {
        console.error("[JobFlow] Error sending message to background:", err);
      }
    });
  },
});