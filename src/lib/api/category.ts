import { CategoryListResponse } from '@/types/category';

interface GetCategoriesRequest {
    page: number;
    limit: number;
    appliesTo?: 'book' | 'product';
}

interface ApiError {
    message: string;
    statusCode: number;
}

export const getCategories = async (request: GetCategoriesRequest): Promise<CategoryListResponse> => {
    try {
        const { page, limit, appliesTo } = request;
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (appliesTo) params.append('appliesTo', appliesTo);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/category?${params.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw new Error(errorData.message || 'Getting categories failed');
        }

        const data: CategoryListResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Get categories error:', error);
        throw error;
    }
};
