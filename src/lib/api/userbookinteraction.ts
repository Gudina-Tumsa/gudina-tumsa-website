
interface CreateUserBookInteraction {
    userId: string;
    bookId: string;
    interactionType:string;
    duration?: string;
    pageReached?: number;
}

interface ApiError {
    message: string;
    statusCode: number;
}

export const createUserBookInteraction = async (request: CreateUserBookInteraction): Promise<void> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/interactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Create user book interaction failed');
        }

         await response.json();

    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
