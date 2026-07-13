
import BookCard from "./BookCard";
import {BookListResponse} from "@/types/book";


interface BookGridProps {
    userId: string;
    title: string;
    books:  BookListResponse | null;
    showCurrentlyReading?: boolean;
}

const BookGrid = ({ userId , title, books, showCurrentlyReading }: BookGridProps) => {
    const hasBooks = books?.data?.books && books.data.books.length > 0;


    return hasBooks ?
    (
        <section className="mb-12 w-full  ">
            {title && <h2 className="dark:text-white font-bold tracking-tight text-2xl text-[#1C1B19] mb-6">{title}</h2>}
            <div className="w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books &&
                    books.data.books.map((book) =>   (

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

                    )

                    )}
            </div>
        </section>
    ) : <div></div>
};

export default BookGrid;
