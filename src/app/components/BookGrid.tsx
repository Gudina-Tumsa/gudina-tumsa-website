
import BookCard from "./BookCard";

interface Book {
    id: string;
    title: string;
    year: string;
    writer : string;
    coverImage: string;
}

interface BookGridProps {
    title: string;
    books: Book[];
    showCurrentlyReading?: boolean;
}

const BookGrid = ({ title, books, showCurrentlyReading }: BookGridProps) => {
    return (
        <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        title={book.title}
                        writer={book.writer}
                        year={book.year}
                        coverImage={book.coverImage}
                        isCurrentlyReading={showCurrentlyReading}
                    />
                ))}
            </div>
        </section>
    );
};

export default BookGrid;