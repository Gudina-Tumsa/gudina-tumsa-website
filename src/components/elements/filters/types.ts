export interface CatalogFilters {
    category: string;
    contentType: string;
    sort: "recent" | "popular" | "downloads" | "views";
}

export const defaultCatalogFilters: CatalogFilters = {
    category: "",
    contentType: "",
    sort: "recent",
};

export const SORT_OPTIONS: { value: CatalogFilters["sort"]; label: string }[] = [
    { value: "recent", label: "Newest" },
    { value: "popular", label: "Most popular" },
    { value: "downloads", label: "Most downloaded" },
    { value: "views", label: "Most viewed" },
];

export const FORMAT_OPTIONS: { value: string; label: string }[] = [
    { value: "", label: "All formats" },
    { value: "Book", label: "eBook" },
    { value: "Audio", label: "Audiobook" },
];