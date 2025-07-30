
export interface CommentData {
    _id: string;
    bookId: string;
    userId: {
        _id: string;
        username: string;
    };
    content: string;
    parentCommentId?: string | null;
    likes: string[];
    dislikes: string[];
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
    isReported: boolean;
    reportReason?: string;
    repliesCount?: number;
    likesCount?: number;
    dislikesCount?: number;
}


export interface CommentListResponse {
    comments: CommentData[];
    total: number;
    page?: number;
    limit?: number;
}