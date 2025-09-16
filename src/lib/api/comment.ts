/* eslint-disable  */
// @ts-nocheck


import {CommentListResponse} from "@/types/comments";

export interface GetCommentsRequest {
    bookId?: string;
    userId?: string;
    parentCommentId?: string | null;
    page?: number;
    limit?: number;
    sort?: 'newest' | 'oldest' | 'popular';
}

interface ApiError {
    message: string;
    statusCode: number;
}

export const getComments = async (request: GetCommentsRequest): Promise<CommentListResponse> => {
    try {
        const params = new URLSearchParams();


        if (request.bookId) params.append('bookId', request.bookId);
        if (request.userId) params.append('userId', request.userId);
        if (request.page) params.append('page', String(request.page));
        if (request.limit) params.append('limit', String(request.limit));
        if (request.sort) params.append('sort', request.sort);


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Getting comments failed');
        }

        const data: CommentListResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Get books error:', error);
        throw error;
    }
};

export const createComment = async (
    bookId: string,
    userId: string,
    content: string,
    parentCommentId?: string
) => {
    try {
        const requestBody: any = {
            bookId: bookId,
            userId: userId,
            content: content
        };

        if (parentCommentId) {
            requestBody.parentCommentId = parentCommentId;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Failed to create comment');
        }

        return await response.json(); // Return the created comment data

    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
}

export const likeAComment = async (userId: string, commentId: string) => {

    try {
        const requestBody: any = {

            userId: userId,
            action: "like"
        };


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${commentId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Failed to create comment');
        }

        return await response.json(); // Return the created comment data

    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
}
export const dislikeAComment =  async (userId: string, commentId: string) => {
    try {
        const requestBody: any = {
            userId: userId,
            action: "dislike"
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${commentId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Failed to create comment');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
}

export const deleteAComment = async(commentId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || 'Failed to delete comment');
    }
    return await response.json();
}

export const updateComment = async (commentId: string, content: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || 'Failed to update comment');
    }

    return await response.json();
};


