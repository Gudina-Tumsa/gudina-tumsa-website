"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { getBooks } from "@/lib/api/book";
import { getMySales } from "@/lib/api/sales";
import { BookData } from "@/types/book";
import MarketplaceBookCard from "./MarketplaceBookCard";
import PurchaseModal from "./PurchaseModal";
import { CatalogFilters } from "@/components/elements/filters/types";

interface MarketplaceSectionProps {
    mode?: "preview" | "grid";
    title?: string;
    limit?: number;
    filters?: CatalogFilters;
}

const MarketplaceSection = ({ mode = "grid", title = "Marketplace", limit, filters }: MarketplaceSectionProps) => {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const token = user?.session?.token;

    const [payableBooks, setPayableBooks] = useState<BookData[]>([]);
    const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [purchaseTarget, setPurchaseTarget] = useState<BookData | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            try {
                const category = filters?.category || undefined;
                const sort = filters?.sort;
                const contentType = filters?.contentType;

                const bookResultsPromise = contentType && contentType !== "Book"
                    ? null
                    : getBooks({ page: 1, limit: 100, contentType: "Book", category, sort });
                const audioResultsPromise = contentType && contentType !== "Audio"
                    ? null
                    : getBooks({ page: 1, limit: 100, contentType: "Audio", category, sort });

                const [bookResults, audioResults] = await Promise.all([
                    bookResultsPromise,
                    audioResultsPromise,
                ]);

                const merged = [
                    ...(bookResults?.data?.books || []),
                    ...(audioResults?.data?.books || []),
                ].filter((book) => book.payable);

                if (cancelled) return;
                setPayableBooks(merged);

                if (token) {
                    const mySales = await getMySales(token);
                    if (cancelled) return;
                    setOwnedIds(new Set(mySales.data.sales.map((sale) => sale.book._id)));
                }
            } catch (err) {
                console.error("Failed to load marketplace books:", err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [token, filters?.category, filters?.contentType, filters?.sort]);

    const handleBuyClick = (book: BookData) => {
        if (!token) {
            router.push("/login");
            return;
        }
        setPurchaseTarget(book);
    };

    const visibleBooks = mode === "preview" ? payableBooks.slice(0, limit ?? 4) : payableBooks;

    if (!loading && payableBooks.length === 0) {
        return mode === "preview" ? null : (
            <p className="text-gray-500 dark:text-gray-400">No books are available for purchase right now.</p>
        );
    }

    return (
        <section className="mb-12 w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="dark:text-white text-xl font-semibold text-gray-900">{title}</h2>
                {mode === "preview" && payableBooks.length > 0 && (
                    <Link href="/marketplace" className="text-sm text-[#C084FC] hover:underline">
                        See all
                    </Link>
                )}
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {visibleBooks.map((book) => (
                    <MarketplaceBookCard
                        key={book._id}
                        book={book}
                        isOwned={ownedIds.has(book._id)}
                        onBuyClick={handleBuyClick}
                    />
                ))}
            </div>

            {purchaseTarget && token && (
                <PurchaseModal
                    book={purchaseTarget}
                    token={token}
                    onClose={() => setPurchaseTarget(null)}
                    onPurchased={() => setOwnedIds((prev) => new Set(prev).add(purchaseTarget._id))}
                />
            )}
        </section>
    );
};

export default MarketplaceSection;