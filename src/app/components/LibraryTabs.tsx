"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    // { label: "Saved", href: "/toread" },
    { label: "Reading", href: "/reading" },
    { label: "Completed", href: "/completed" },
];

const LibraryTabs = () => {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-1 border-b border-[#E8E1D3] dark:border-gray-700 mb-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
                const isActive = pathname?.startsWith(tab.href);
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                            isActive
                                ? "text-[#1C1B19] dark:text-white"
                                : "text-[#8A8374] dark:text-gray-400 hover:text-[#1C1B19] dark:hover:text-white"
                        }`}
                    >
                        {tab.label}
                        {isActive && (
                            <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[#9407F2] dark:bg-[#C084FC]" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default LibraryTabs;
