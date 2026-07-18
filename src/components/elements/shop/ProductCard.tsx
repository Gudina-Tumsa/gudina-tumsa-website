"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ProductData } from "@/types/product";

interface ProductCardProps {
    product: ProductData;
    onAddToCart: (product: ProductData) => void;
    adding?: boolean;
}

const ProductCard = ({ product, onAddToCart, adding }: ProductCardProps) => {
    const outOfStock = !product.isDigital && product.stock === 0;
    const lowStock = !product.isDigital && !outOfStock && product.stock <= product.lowStockThreshold;
    const categoryName = typeof product.category === "string" ? undefined : product.category?.name;

    return (
        <div className="group flex flex-col">
            <Link href={`/shop/${product._id}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm dark:bg-gray-800">
                    {product.images[0] ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0]}`}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400 dark:text-gray-500">
                            No image
                        </div>
                    )}

                    <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm dark:bg-gray-900/90 dark:text-white">
                        {product.price} ETB
                    </span>

                    {product.isDigital && (
                        <span className="absolute top-3 left-3 rounded-full bg-[#9407F2] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                            Digital
                        </span>
                    )}

                    {outOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
                            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900">
                                Out of stock
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="mt-3 flex flex-1 flex-col">
                {categoryName && (
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                        {categoryName}
                    </span>
                )}
                <Link href={`/shop/${product._id}`}>
                    <h3 className="mt-0.5 line-clamp-1 font-semibold text-gray-900 hover:underline dark:text-white">
                        {product.name}
                    </h3>
                </Link>
                {lowStock && (
                    <span className="mt-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                        Only {product.stock} left
                    </span>
                )}

                <button
                    onClick={() => onAddToCart(product)}
                    disabled={outOfStock || adding}
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-full border border-[#9407F2] px-4 py-2 text-sm font-medium text-[#9407F2] transition-colors hover:bg-[#9407F2] hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent dark:border-[#C084FC] dark:text-[#C084FC] dark:hover:bg-[#9407F2] dark:hover:text-white dark:disabled:border-gray-600 dark:disabled:text-gray-500"
                >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {outOfStock ? "Out of stock" : adding ? "Adding…" : "Add to cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
