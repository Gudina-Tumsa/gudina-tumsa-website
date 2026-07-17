"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { getBooks } from "@/lib/api/book";
import { getMySales } from "@/lib/api/sales";
import { BookData } from "@/types/book";
import { MySaleEntry } from "@/types/sale";
import FeaturedBanner from "@/components/elements/marketplace/FeaturedBanner";
import ForSaleCard from "@/components/elements/marketplace/ForSaleCard";
import PurchaseModal from "@/components/elements/marketplace/PurchaseModal";
import FilterPillBar from "@/components/elements/filters/FilterPillBar";
import { defaultCatalogFilters } from "@/components/elements/filters/types";
import { useCategories } from "@/lib/hooks/useCategories";

const MyPurchases = ({ sales }: { sales: MySaleEntry[] }) => {
    if (sales.length === 0) return null;

    return (
        <section className="mb-10 w-full">
            <div className="flex items-baseline gap-2 mb-4">
                <h2 className="font-bold tracking-tight text-2xl text-gray-900 dark:text-white">My purchases</h2>
                <span className="text-sm text-gray-400">{sales.length} items</span>
            </div>
            <div className="flex flex-wrap gap-4">
                {sales.map((sale) => (
                    <Link
                        key={sale._id}
                        href={`/bookdetail/${sale.book._id}`}
                        className="flex items-center gap-4 bg-white dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm p-4 w-full sm:w-[320px] hover:shadow-md transition-shadow"
                    >
                        <div className="w-16 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                            <img
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${sale.book.coverImageUrl}`}
                                alt={sale.book.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{sale.book.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{sale.book.author}</p>
                            <span className="text-sm font-medium text-[#9407F2] underline mt-1 inline-block">
                                Continue reading
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default function MarketplacePage() {
    const user = useSelector((state: RootState) => state.user);
    const token = user?.session?.token;
    const router = useRouter();
    const { categories } = useCategories();

    const [filters, setFilters] = useState(defaultCatalogFilters);
    const [search, setSearch] = useState("");
    const [payableBooks, setPayableBooks] = useState<BookData[]>([]);
    const [sales, setSales] = useState<MySaleEntry[]>([]);
    const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [purchaseTarget, setPurchaseTarget] = useState<BookData | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            try {
                const category = filters.category || undefined;
                const sort = filters.sort;
                const contentType = filters.contentType;

                const bookResultsPromise =
                    contentType && contentType !== "Book"
                        ? null
                        : getBooks({ page: 1, limit: 100, contentType: "Book", category, sort });
                const audioResultsPromise =
                    contentType && contentType !== "Audio"
                        ? null
                        : getBooks({ page: 1, limit: 100, contentType: "Audio", category, sort });

                const [bookResults, audioResults] = await Promise.all([bookResultsPromise, audioResultsPromise]);

                const merged = [
                    ...(bookResults?.data?.books || []),
                    ...(audioResults?.data?.books || []),
                ].filter((book) => book.payable);

                if (cancelled) return;
                setPayableBooks(merged);

                if (token) {
                    const mySales = await getMySales(token);
                    if (cancelled) return;
                    // /api/sales/my now also returns pending/refunded sales (for the purchase
                    // history page) — only a finalized, non-refunded sale grants access, so
                    // "owned"/"continue reading" here must stay scoped to those.
                    const completedSales = mySales.data.sales.filter(
                        (sale) => sale.finalized && !sale.refunded
                    );
                    setSales(completedSales);
                    setOwnedIds(new Set(completedSales.map((sale) => sale.book._id)));
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
    }, [token, filters.category, filters.contentType, filters.sort]);

    const visibleBooks = useMemo(() => {
        if (!search.trim()) return payableBooks;
        const q = search.trim().toLowerCase();
        return payableBooks.filter(
            (book) => book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
        );
    }, [payableBooks, search]);

    const featuredBook = useMemo(
        () => payableBooks.find((book) => book.isFeatured) ?? payableBooks[0],
        [payableBooks]
    );

    const handleBuyClick = (book: BookData) => {
        if (!token) {
            router.push("/login");
            return;
        }
        setPurchaseTarget(book);
    };

    return (
        <SidebarLayout>
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                    <div>
                        <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl text-gray-900 dark:text-white mb-1">
                            Marketplace
                        </h1>
                        <p className="text-gray-500 dark:text-gray-300">Books and audiobooks from the collection</p>
                    </div>
                    <div className="relative w-full sm:max-w-xs flex-shrink-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search titles, authors..."
                            className="w-full h-11 pl-11 pr-4 rounded-full border border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C084FC]/50 focus:border-[#C084FC] placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8" />

                {featuredBook && (
                    <FeaturedBanner
                        book={featuredBook}
                        isOwned={ownedIds.has(featuredBook._id)}
                        onBuyClick={handleBuyClick}
                    />
                )}

                <FilterPillBar categories={categories} filters={filters} onChange={setFilters} />

                {token && <MyPurchases sales={sales} />}

                <section className="w-full">
                    <h2 className="font-bold tracking-tight text-2xl text-gray-900 dark:text-white mb-4">For sale</h2>
                    {!loading && visibleBooks.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">No books match these filters.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {visibleBooks.map((book) => (
                                <ForSaleCard
                                    key={book._id}
                                    book={book}
                                    isOwned={ownedIds.has(book._id)}
                                    onBuyClick={handleBuyClick}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {purchaseTarget && token && (
                    <PurchaseModal
                        book={purchaseTarget}
                        token={token}
                        onClose={() => setPurchaseTarget(null)}
                        onPurchased={() => setOwnedIds((prev) => new Set(prev).add(purchaseTarget._id))}
                    />
                )}
            </div>
        </SidebarLayout>
    );
}
