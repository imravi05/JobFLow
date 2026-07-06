import { browser } from "wxt/browser";
import { applicationService } from "~/services/ApplicationService";
import { notificationService } from "~/services/NotificationService";
import type { MessageType, MessageResponse } from "~/types/messages";

export default defineBackground(() => {
  console.log('🚀 JobFlow Background Active', { id: browser.runtime.id });

  browser.runtime.onMessage.addListener((message: MessageType, sender, sendResponse) => {
    if (message.type === 'APPLICATION_SUBMITTED') {
      const job = message.payload;
      
      // We must handle this asynchronously, but return true to indicate we will sendResponse
      (async () => {
        try {
          // Save to database
          await applicationService.createApplication(job);
          
          // Notify the user
          await notificationService.notifySuccess(
            "Application Saved", 
            `Successfully tracked your application for ${job.title} at ${job.company}`
          );

          sendResponse({ success: true });
        } catch (error: any) {
          console.error("[JobFlow] Error processing application submission", error);
          sendResponse({ success: false, error: error.message });
        }
      })();

      return true; // Indicates asynchronous response
    }
  });
});
