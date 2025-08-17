/* eslint-disable  */
// @ts-nocheck

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, ToolbarProps } from "@react-pdf-viewer/default-layout";
import { createUserBookInteraction } from "@/lib/api/userbookinteraction";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ReactReader } from "react-reader";
import { useSelector } from "react-redux";
import type { Rendition } from "epubjs";

const getPageNumberFromCFI = (cfi: string): number => {
    if (!cfi || typeof cfi !== 'string') return 0;
    const match = cfi.match(/epubcfi\(\/6\/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
};

const EpubControls = ({ rendition, theme, setTheme }) => {
    if (!rendition.current) return null;

    const changeFontSize = (increase) => {
        const newSize = parseInt(theme.fontSize.replace('%', '')) + (increase ? 10 : -10);
        setTheme({ ...theme, fontSize: `${newSize}%` });
    };

    const changeFontFamily = (font) => {
        setTheme({ ...theme, fontFamily: font });
    };

    const prevPage = () => rendition.current?.prev();
    const nextPage = () => rendition.current?.next();

    return (
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 255, 255, 0.9)', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 100, display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button onClick={prevPage}>&larr; Previous</button>
            <button onClick={() => changeFontSize(false)}>-</button>
            <span>Font Size</span>
            <button onClick={() => changeFontSize(true)}>+</button>
            <select onChange={(e) => changeFontFamily(e.target.value)} value={theme.fontFamily}>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
            </select>
            <button onClick={nextPage}>Next &rarr;</button>
        </div>
    );
};

export default function Home() {
    const params = useParams();
    const id = params?.id as string;
    const rendition = useRef<Rendition | undefined>(undefined);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [bookFormat, setBookFormat] = useState<"pdf" | "epub" | null>(null);
    const [location, setLocation] = useState<string | number | null>(1);
    const user = useSelector((state: RootState) => state.user);

    // NEW: State for the raw ArrayBuffer data for EPUBs
    const [bookData, setBookData] = useState<ArrayBuffer | null>(null);

    const [theme, setTheme] = useState({
        fontFamily: 'Arial',
        fontSize: '100%',
    });

    useEffect(() => {
        if (rendition.current && bookFormat === 'epub') {
            rendition.current.themes.override('font-family', theme.fontFamily);
            rendition.current.themes.fontSize(theme.fontSize);
        }
    }, [theme, bookFormat]);

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        onPageChange: (e) => {
            const currentPage = e.currentPage;
            const totalPages = e.numberOfPages;

            createUserBookInteraction({
                userId: user?.user._id,
                bookId: id,
                interactionType: (currentPage + 1 === totalPages) ? 'finished' : 'view',
                pageReached: currentPage + 1,
                duration: 0,
            });
        },
        renderToolbar: (Toolbar: React.FC<ToolbarProps>) => (
            <Toolbar>{(slots) => {
                const { CurrentPageInput, EnterFullScreen, GoToNextPage, GoToPreviousPage, NumberOfPages, ShowSearchPopover, Zoom, ZoomIn, ZoomOut } = slots;
                return (<div className={"flex flex-row items-center justify-between px-[3%] w-full"}> <p className={"font-bold"}>GTL Reader</p> <div className={"flex flex-row items-center"}> <div style={{ padding: "0 2px" }}><ShowSearchPopover /></div> <div style={{ padding: "0 2px" }}><ZoomOut /></div> <div style={{ padding: "0 2px" }}><Zoom /></div> <div style={{ padding: "0 2px" }}><ZoomIn /></div> <div style={{ padding: "0 2px" }}><CurrentPageInput /> / <NumberOfPages /></div> <div style={{ padding: "0 2px" }}><GoToPreviousPage /></div> <div style={{ padding: "0 2px" }}><GoToNextPage /></div> <div style={{ padding: "0 2px" }}><EnterFullScreen /></div> </div> </div>);
            }}</Toolbar>
        ),
    });

    const loadBook = async () => {
        if (!id) return;
        try {
            setIsLoading(true);
            setPdfUrl(null);
            setBookData(null); // Reset states

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${id}/pages?page=1&limit=1000`);
            if (!response.ok) throw new Error("Failed to fetch book");

            const format = response.headers.get('X-Book-Format') as "pdf" | "epub" | null;
            setBookFormat(format);

            const buffer = await response.arrayBuffer();

            // CHANGED: Use ArrayBuffer for EPUB, Blob URL for PDF
            if (format === 'epub') {
                setBookData(buffer);
            } else if (format === 'pdf') {
                const blobUrl = URL.createObjectURL(new Blob([buffer], { type: 'application/pdf' }));
                setPdfUrl(blobUrl);
            }
        } catch (error) {
            console.error("Error loading book:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBook();
    }, [id]);

    return (
        <main style={{ height: "100vh", position: 'relative' }}>
            {isLoading && (
                <div className="flex items-center justify-center h-full">
                    <p>Loading book...</p>
                </div>
            )}

            {bookFormat === "pdf" && pdfUrl && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <div style={{ height: "100vh" }}>
                        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                    </div>
                </Worker>
            )}

            {bookFormat === "epub" && bookData && (
                <>
                    <ReactReader

                        url={bookData}
                        location={location}
                        locationChanged={async (cfi: string) => {
                            setLocation(cfi);
                            const pageNumber = getPageNumberFromCFI(cfi);


                            let interactionType: 'view' | 'finished' = 'view';

                            try {
                                const totalLocations = rendition.current?.book.locations.length();
                                const currentLocation = rendition.current?.book.locations.locationFromCfi(cfi);
                                console.log(totalLocations);
                                console.log(currentLocation)
                                if (currentLocation >= totalLocations * 0.95) {
                                    interactionType = 'finished';
                                }
                            } catch (error) {
                                console.warn('Could not determine if user is on last page:', error);
                            }

                            createUserBookInteraction({
                                userId: user?.user._id,
                                bookId: id,
                                interactionType,
                                pageReached: pageNumber,
                                duration: 0,
                            });
                        }}

                        getRendition={(_rendition: Rendition) => {
                            rendition.current = _rendition;
                            rendition.current.themes.override('font-family', theme.fontFamily);
                            rendition.current.themes.fontSize(theme.fontSize);

                            // Ensure locations are generated
                            _rendition.book.ready.then(() => {
                                _rendition.book.locations.generate(1000).then(() => {
                                    console.log("EPUB locations generated");
                                });
                            });
                        }}
                    />
                    <EpubControls rendition={rendition} theme={theme} setTheme={setTheme} />
                </>
            )}
        </main>
    );
}
