import { SessionListResponse } from '@/types/sessions';


interface ApiError {
    message: string;
    statusCode: number;
}


export const logoutSession = async (sessionId : string) => {
    try{
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/sessions/${sessionId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Getting categories failed');
        }

        const data: SessionListResponse = await response.json();
        return data;
    }catch(error : unknown){
        console.error('Get categories error:', error);
        throw error;
    }
}

export const getSessions = async (userId: string): Promise<SessionListResponse> => {
    try {


        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/sessions?userId=${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Getting sessions failed');
        }

        const data: SessionListResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Get sessions error:', error);
        throw error;
    }
};
