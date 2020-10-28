export interface NotificationModel extends GlobalNotificationModel {
    recipients: string[];
  }

export interface GlobalNotificationModel {
  channel: string;
  from: string;
  title: string;
  message: string;
}
