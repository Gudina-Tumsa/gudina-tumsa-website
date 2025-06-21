const BookDetails = () => {
    return (
        <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Fundamentals of Building Construction
            </h1>
            <p className="text-xl text-gray-600 mb-4">Materials and Methods</p>

            <div className="flex flex-wrap gap-2 mb-6">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Edward Allen
                </a>
                <span className="text-gray-400">,</span>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Joseph Iano
                </a>


            </div>
        </div>
    );
};

export default BookDetails;