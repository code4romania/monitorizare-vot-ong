export interface HistoryNotifications {
  data: HistoryNotificationModel[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface HistoryNotificationModel {
  id: number;
  title: string;
  body: string;
  channel: string;
  insertedAt: string;
  senderId: number;
  senderIdNgo: number;
  senderNgoName: string;
  senderAccount: string;
  sentObserverIds: number[];
}

export interface SentNotificationModel extends SentGlobalNotificationModel {
  recipients: string[];
}

export interface SentGlobalNotificationModel {
  channel: string;
  from: string;
  title: string;
  message: string;
}
