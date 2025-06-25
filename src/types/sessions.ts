
export interface SessionResponse {
    _id : string;
    userId: string;
    token: string;
    refreshToken: string;
    deviceId: string;
    deviceInfo: {
        name?: string;
        type: string;
        os: string;
        browser: string;
        ipAddress: string;
        location?: string;
    };
    createdAt: Date;
    expiresAt: Date;

}

export interface SessionListResponse {

    data: {
        sessions : SessionResponse[],
        count : number

    }
}