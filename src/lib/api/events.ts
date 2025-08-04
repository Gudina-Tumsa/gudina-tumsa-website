import { EventListResponse } from '@/types/events';

export interface GetEventsRequest {
    isActive?: boolean;
    upcomingOnly?: boolean;
    createdBy?: string;
    attendeeId?: string;
    page?: number;
    limit?: number;
    search?: string;
}

interface ApiError {
    message: string;
    statusCode: number;
}

export const getEvents = async (request: GetEventsRequest): Promise<EventListResponse> => {
    try {
        const params = new URLSearchParams();


        if (typeof request.isActive === 'boolean') params.append('isActive', String(request.isActive));
        if (request.page) params.append('page', String(request.page));
        if (request.limit) params.append('limit', String(request.limit));

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Getting events failed');
        }

        const data: EventListResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Get events error:', error);
        throw error;
    }
};
