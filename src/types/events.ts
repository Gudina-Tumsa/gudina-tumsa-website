export interface EventData {
    _id: string;
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
    isActive: boolean;
    attendees: string[];
    attendeesCount: number;
}

export interface EventListResponse  {
    data : {
        events: EventData[];
        total: number;
        page?: number;
        limit?: number;
    }
}