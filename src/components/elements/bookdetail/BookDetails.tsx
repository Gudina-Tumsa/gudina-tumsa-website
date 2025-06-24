import {BookData} from "@/types/book";

const BookDetails = ({bookData } : {bookData : BookData | null}) => {
    return (
        bookData ?
        <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {bookData.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{bookData.category}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    {bookData.author}
                </a>



            </div>
        </div> : ""
    );
};

export default BookDetails;