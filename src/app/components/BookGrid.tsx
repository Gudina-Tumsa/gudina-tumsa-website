
import BookCard from "./BookCard";
import {BookListResponse} from "@/types/book";


interface BookGridProps {
    userId: string;
    title: string;
    books:  BookListResponse | null;
    showCurrentlyReading?: boolean;
}

const BookGrid = ({ userId , title, books, showCurrentlyReading }: BookGridProps) => {
    return (
        <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
                {books &&
                    books.data.books.map((book) => (
                        <BookCard
                            key={book._id}
                            title={book.title}
                            writer={book.author}
                            year={book.publicationYear}
                            coverImage={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                            isCurrentlyReading={showCurrentlyReading}
                            userId={userId}
                            id={book._id}
                        />
                    ))}
            </div>
        </section>
    );
};

export default BookGrid;