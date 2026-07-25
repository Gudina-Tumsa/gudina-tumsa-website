import { BaseNotificationResponse, NotificationListResponse } from '@/types/notification';

interface ApiErrorBody {
    message: string;
}

export class NotificationApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'NotificationApiError';
        this.statusCode = statusCode;
    }
}

const parseErrorAndThrow = async (response: Response): Promise<never> => {
    let message = 'Request failed';
    try {
        const errorData: ApiErrorBody = await response.json();
        message = errorData.message || message;
    } catch {
        // response body wasn't JSON, fall back to the default message
    }
    throw new NotificationApiError(message, response.status);
};

export const getUserNotifications = async (
    token: string,
    userId: string,
    options?: { page?: number; limit?: number; unreadOnly?: boolean }
): Promise<NotificationListResponse> => {
    const params = new URLSearchParams();
    if (options?.page) params.set('page', String(options.page));
    if (options?.limit) params.set('limit', String(options.limit));
    if (options?.unreadOnly) params.set('unreadOnly', 'true');

    const query = params.toString();
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/user/${userId}${query ? `?${query}` : ''}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const markNotificationsRead = async (
    token: string,
    recipientId: string,
    notificationIds?: string[]
): Promise<BaseNotificationResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/mark-as-read`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientId, notificationIds }),
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const markAllNotificationsRead = async (token: string, userId: string): Promise<BaseNotificationResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/mark-all-read/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};
