/* eslint-disable */
// @ts-nocheck

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef, Fragment } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, ToolbarProps } from "@react-pdf-viewer/default-layout";
import { createUserBookInteraction } from "@/lib/api/userbookinteraction";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ReactReader ,   ReactReaderStyle } from "react-reader";
import { useSelector } from "react-redux";
import type { Rendition } from "epubjs";
import { Dialog, Transition } from "@headlessui/react";
import { Settings, X, Sun, Moon } from 'lucide-react';
const getPageNumberFromCFI = (cfi: string): number => {
    if (!cfi || typeof cfi !== 'string') return 0;
    const match = cfi.match(/epubcfi\(\/6\/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
};
const EpubControls = ({ rendition, theme, setTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
       if (!rendition.current) return null;

    const changeFontSize = (increase) => {
        const newSize = Math.max(50, Math.min(200, parseInt(theme.fontSize.replace('%', '')) + (increase ? 10 : -10)));
        setTheme({ ...theme, fontSize: `${newSize}%` });
    };

    const changeFontFamily = (font) => {
        setTheme({ ...theme, fontFamily: font });
    };

    const toggleMode = () => {
        setTheme({ ...theme, mode: theme.mode === 'dark' ? 'light' : 'dark' });
    };

    const isDark = theme.mode === 'dark';

    return (
        <div className={`${isDark ? 'bg-black' : 'bg-white'}`}>

            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
                title="Settings"
            >
                <Settings className="w-5 h-5" />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div
                        className={`rounded-lg p-6 w-full max-w-md shadow-xl relative transition-all
                            ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}
                        `}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-semibold mb-6">Reader Settings</h2>

                        {/* Font Size Controls */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium mb-2">Font Size</label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => changeFontSize(false)}
                                    className={`px-3 py-1 rounded ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    A-
                                </button>
                                <span>{theme.fontSize}</span>
                                <button
                                    onClick={() => changeFontSize(true)}
                                    className={`px-3 py-1 rounded ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    A+
                                </button>
                            </div>
                        </div>

                        {/* Font Family */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium mb-2">Font Family</label>
                            <select
                                onChange={(e) => changeFontFamily(e.target.value)}
                                value={theme.fontFamily}
                                className={`w-full border px-3 py-2 rounded text-sm 
                                    ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'}
                                `}
                            >
                                <option value="Arial">Arial</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Helvetica">Helvetica</option>
                            </select>
                        </div>

                        {/* Theme Toggle */}
                        <div className="flex items-center gap-4 mt-6">
                            <span className="text-sm">Theme:</span>
                            <button
                                onClick={toggleMode}
                                className={`flex items-center gap-2 px-4 py-2 rounded transition 
                                    ${isDark ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-gray-800 text-white hover:bg-gray-700'}
                                `}
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                {isDark ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
    const [bookData, setBookData] = useState<ArrayBuffer | null>(null);

    const [theme, setTheme] = useState({ fontFamily: 'Arial', fontSize: '100%', mode: 'light' });


    const [currentPdfPage, setCurrentPdfPage] = useState(0);
    const [totalPdfPages, setTotalPdfPages] = useState(0);

    // Modal + rating state
    const [showFinishModal, setShowFinishModal] = useState(false);
    const [rating, setRating] = useState(0);
    useEffect(() => {
        const rateBook = async (bookId, rating) => {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/rating/${bookId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "value":  rating }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to rate book: ${response.status}`);
                }

                const data = await response.json();
                console.log("Book rated successfully:", data);
                return data;
            } catch (e) {
                console.error("Error rating book:", e);
            }
        };
        rateBook(id,rating);
    }, [rating]);
    const defaultLayoutPluginInstance = defaultLayoutPlugin({


        renderToolbar: (Toolbar: React.FC<ToolbarProps>) => (
            <Toolbar>{(slots) => {
                const { CurrentPageInput, EnterFullScreen, GoToNextPage, GoToPreviousPage, NumberOfPages, ShowSearchPopover, Zoom, ZoomIn, ZoomOut } = slots;
                return (
                    <div className="flex flex-row items-center flex-wrap gap-1">
                        <div className="px-1"><ShowSearchPopover /></div>
                        <div className="px-1"><ZoomOut /></div>
                        <div className="px-1"><Zoom /></div>
                        <div className="px-1"><ZoomIn /></div>
                        <div className="px-1 flex items-center">
                            <CurrentPageInput /> / <NumberOfPages />
                        </div>
                        <div className="px-1"><GoToPreviousPage /></div>
                        <div className="px-1"><GoToNextPage /></div>
                        <div className="px-1"><EnterFullScreen /></div>
                    </div>
                );
            }}</Toolbar>
        ),
    });

    const loadBook = async () => {
        if (!id) return;
        try {
            setIsLoading(true);
            setPdfUrl(null);
            setBookData(null);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${id}/pages?page=1&limit=1000`);
            if (!response.ok) throw new Error("Failed to fetch book");

            const format = response.headers.get('X-Book-Format') as "pdf" | "epub" | null;
            setBookFormat(format);

            const buffer = await response.arrayBuffer();

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

    useEffect(() => {
        if (rendition.current && bookFormat === 'epub') {
            const isDark = theme.mode === 'dark';

            rendition.current.themes.override('font-family', theme.fontFamily);
            rendition.current.themes.fontSize(theme.fontSize);

            // Background & text color
            rendition.current.themes.override('background-color', isDark ? '#1f2937' : '#ffffff'); // Tailwind: gray-800 vs white
            rendition.current.themes.override('color', isDark ? '#f9fafb' : '#1f2937'); // Tailwind: gray-100 vs gray-800

            rendition.current.themes.default({
                body: {
                    background: isDark ? '#1f2937' : '#ffffff',
                    color: isDark ? '#f9fafb' : '#1f2937',
                    margin: 0,
                    padding: 0,
                }
            });
        }
    }, [theme, bookFormat]);

    const handleFinishConfirm = async () => {
        await createUserBookInteraction({
            userId: user?.user._id,
            bookId: id,
            interactionType: 'finished',
            pageReached: 'end',
            duration: 0,
            rating,
        });

        setShowFinishModal(false);
    };

    const lightReaderTheme = {
        ...ReactReaderStyle,
        readerArea: {
            ...ReactReaderStyle.readerArea,
            transition: undefined,
        },
    }

    const darkReaderTheme= {
        ...ReactReaderStyle,
        arrow: {
            ...ReactReaderStyle.arrow,
            color: 'white',
        },
        arrowHover: {
            ...ReactReaderStyle.arrowHover,
            color: '#ccc',
        },
        readerArea: {
            ...ReactReaderStyle.readerArea,
            backgroundColor: '#1f2937',
            transition: undefined,
        },
        titleArea: {
            ...ReactReaderStyle.titleArea,
            color: '#ccc',
        },
        tocArea: {
            ...ReactReaderStyle.tocArea,
            background: '#1f2937',
        },
        tocButtonExpanded: {
            ...ReactReaderStyle.tocButtonExpanded,
            background: '#222',
        },
        tocButtonBar: {
            ...ReactReaderStyle.tocButtonBar,
            background: '#fff',
        },
        tocButton: {
            ...ReactReaderStyle.tocButton,
            color: 'white',
        },
    }
    return (
        <main className={`relative h-screen ${theme.mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

        {isLoading && (
                <div className="flex items-center justify-center h-full">
                    <p>Loading book...</p>
                </div>
            )}

            {bookFormat === "pdf" && pdfUrl && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
                    <div style={{ height: "100vh" }}>
                        <Viewer
                            fileUrl={pdfUrl}
                            plugins={[defaultLayoutPluginInstance]}
                            onPageChange={(e) => {
                                const currentPage = e.currentPage + 1; // pages are 0-indexed
                                const totalPages = e?.doc?._pdfInfo?.numPages;
                                console.log("currentPage", currentPage, totalPages);
                                setCurrentPdfPage(currentPage);
                                setTotalPdfPages(totalPages);


                                if (currentPage === totalPages && !showFinishModal) {
                                   setTimeout(() => {
                                       setShowFinishModal(true);
                                   },3000)
                                }

                                if (currentPage != totalPages) {
                                    createUserBookInteraction({
                                        userId: user?.user._id,
                                        bookId: id,
                                        interactionType: currentPage === totalPages ? 'finished' : 'view',
                                        pageReached: currentPage,
                                        duration: 0,
                                    });
                                }

                            }}
                        />
                    </div>
                </Worker>
            )}

            {bookFormat === "epub" && bookData && (
                <>
                    <ReactReader
                        url={bookData}
                        location={location}
                        readerStyles={theme.mode === 'dark' ? darkReaderTheme : lightReaderTheme}
                        // epubOptions={{
                        //     flow: 'scrolled',
                        //     manager: 'continuous',
                        // }}
                        locationChanged={async (cfi: string) => {
                            setLocation(cfi);
                            const pageNumber = getPageNumberFromCFI(cfi);

                            let interactionType: 'view' | 'finished' = 'view';

                            try {
                                const totalLocations = rendition.current?.book.locations.length();
                                const currentLocation = rendition.current?.book.locations.locationFromCfi(cfi);

                                if (currentLocation >= totalLocations * 0.95 && !showFinishModal) {
                                    interactionType = 'finished';
                                    setShowFinishModal(true);
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

                            const isDark = theme.mode === 'dark';

                            _rendition.themes.default({
                                body: {
                                    background: isDark ? '#1f2937' : '#ffffff', // Tailwind gray-900 or white
                                    color: isDark ? '#f9fafb' : '#1f2937',       // Tailwind gray-100 or gray-900
                                    margin: 0,
                                    padding: 0,
                                },
                                html: {
                                    background: isDark ? '#1f2937' : '#ffffff',
                                },
                                a: {
                                    color: isDark ? '#93c5fd' : '#1d4ed8', // blue-300 or blue-700
                                }
                            });

                            _rendition.themes.fontSize(theme.fontSize);
                            _rendition.themes.override('font-family', theme.fontFamily);

                            _rendition.book.ready.then(() => {
                                _rendition.book.locations.generate(1000);
                            });
                        }}

                    />
                    <EpubControls rendition={rendition} theme={theme} setTheme={setTheme} />
                </>
            )}

            {/* 📘 Finish Modal */}
            <Transition appear show={showFinishModal} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setShowFinishModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Did you finish reading?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 mb-4">We'd love to know what you thought. Rate the book below:</p>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                                            onClick={() => setShowFinishModal(false)}
                                        >
                                            Not Yet
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                            onClick={handleFinishConfirm}
                                        >
                                            Submit Rating
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </main>
    );
}
