const BookGridSkeleton = ({ count = 10 }: { count?: number }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-2xl bg-[#EFE9DC] dark:bg-gray-700" />
                <div className="h-4 mt-3 rounded bg-[#EFE9DC] dark:bg-gray-700 w-3/4" />
                <div className="h-3 mt-2 rounded bg-[#EFE9DC] dark:bg-gray-700 w-1/2" />
            </div>
        ))}
    </div>
);

export default BookGridSkeleton;
