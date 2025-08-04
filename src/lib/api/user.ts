
export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    role?: string;
    username? : string;
    password?: string;
    languagePreference?: string;
    readingPreferences?: string[];
}
interface ApiError {
    message: string;
    statusCode: number;
}


export const updateUser = async (request : UpdateUserRequest , id : string) => {
   try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(request),
           credentials: 'include',
       });

       if (!response.ok) {
           const errorData: ApiError = await response.json();
           throw new Error(errorData.message || 'Login failed');
       }
   } catch(error : unknown){
        console.error('Login error:', error);
        throw error;
    }

}

export const resetUser = async (request : UpdateUserRequest , email : string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/reset/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message ||  'reset password failed');
        }
    } catch(error : unknown){
        console.error('Reset error:', error);
        throw error;
    }

}
