import { browser } from 'wxt/browser';

export class NotificationService {
  async notifySuccess(title: string, message: string) {
    if (browser.notifications) {
      await browser.notifications.create({
        type: 'basic',
        iconUrl: browser.runtime.getURL('/icon/128.png'),
        title,
        message,
      });
    } else {
      console.log(`Notification: ${title} - ${message}`);
    }
  }

  async scheduleReminder(applicationId: string, company: string, delayInMinutes: number = 7 * 24 * 60) {
    if (browser.alarms) {
      const alarmName = `followup-${applicationId}`;
      browser.alarms.create(alarmName, {
        delayInMinutes,
      });
      // A background listener will intercept this alarm and trigger a notification.
    }
  }
}

export const notificationService = new NotificationService();
