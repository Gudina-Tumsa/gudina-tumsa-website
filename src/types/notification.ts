export interface NotificationData {
    _id: string;
    recipientId: string;
    message: string;
    type: string;
    isRead: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationListResponse {
    success: boolean;
    notifications: NotificationData[];
    total: number;
    unreadCount: number;
    page?: number;
    limit?: number;
}

export interface BaseNotificationResponse {
    success: boolean;
    message?: string;
}
