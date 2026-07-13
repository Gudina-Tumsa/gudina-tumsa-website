import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface LibraryEmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    ctaLabel?: string;
    ctaHref?: string;
}

const LibraryEmptyState = ({ icon: Icon, title, description, ctaLabel, ctaHref }: LibraryEmptyStateProps) => (
    <div className="rounded-3xl border border-dashed border-[#E8E1D3] dark:border-gray-600 bg-white/60 dark:bg-gray-700/40 px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#9407F2]/10">
            <Icon className="h-6 w-6 text-[#9407F2] dark:text-[#C084FC]" />
        </div>
        <h3 className="font-bold tracking-tight text-2xl text-[#1C1B19] dark:text-white mb-2">{title}</h3>
        <p className="text-[#8A8374] dark:text-gray-400 max-w-sm mx-auto mb-6">{description}</p>
        {ctaLabel && ctaHref && (
            <Link
                href={ctaHref}
                className="inline-flex items-center rounded-full bg-[#9407F2] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7d06cc]"
            >
                {ctaLabel}
            </Link>
        )}
    </div>
);

export default LibraryEmptyState;
