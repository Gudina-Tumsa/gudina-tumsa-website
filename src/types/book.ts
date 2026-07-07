export interface BookData {
    _id: string;
    title: string;
    titleTranslations: Record<string, string>;
    author: string;
    authorTranslations: Record<string, string>;
    description: string;
    descriptionTranslations: Record<string, string>;
    audioSummarizationUrl: string | null;
    publisher: string;
    publicationYear: number;
    isbn: string;
    category: string;
    tags: string[];
    language: string;
    fileUrl: string | null;
    coverImageUrl: string;
    price: number;
    payable: boolean;
    fileSize: number;
    pageCount: number;
    downloadCount: number;
    viewCount: number;
    isFeatured: boolean;
    uploadDate: Date;
    uploadedBy: string;
    isActive: boolean;
    metadata: Record<string, unknown>;
    rating: number;
    pageReached : string;
    contentType : string;
}



export interface BookListResponse {
   data : {
       books: BookData[];
       total: number;
       page?: number;
       limit?: number;
   }
}
