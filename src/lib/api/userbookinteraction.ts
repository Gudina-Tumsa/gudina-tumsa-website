
interface CreateUserBookInteraction {
    userId: string;
    bookId: string;
    interactionType:string;
    duration?: number;
    pageReached?: number;
}

interface ApiError {
    message: string;
    statusCode: number;
}

export const createUserBookInteraction = async (request: CreateUserBookInteraction): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3000/api/interactions`, {
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
