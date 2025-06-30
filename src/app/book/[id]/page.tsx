"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, ToolbarProps } from "@react-pdf-viewer/default-layout";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
// import { Spinner } from "@/components/ui/spinner"; // You can replace with your own loading component
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Home() {
    const params = useParams();
    const id = params?.id as string;
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [allPages, setAllPages] = useState<ArrayBuffer[]>([]);
    const viewerRef = useRef<any>(null);

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar: (Toolbar: React.FC<ToolbarProps>) => (
            <Toolbar>
                {(slots) => {
                    const {
                        CurrentPageInput,
                        EnterFullScreen,
                        GoToNextPage,
                        GoToPreviousPage,
                        NumberOfPages,
                        ShowSearchPopover,
                        Zoom,
                        ZoomIn,
                        ZoomOut,
                    } = slots;

                    return (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ padding: "0 2px" }}>
                                <ShowSearchPopover />
                            </div>
                            <div style={{ padding: "0 2px" }}>
                                <ZoomOut />
                            </div>
                            <div style={{ padding: "0 2px" }}>
                                <Zoom />
                            </div>
                            <div style={{ padding: "0 2px" }}>
                                <ZoomIn />
                            </div>
                            <div style={{ padding: "0 2px" }}>
                                <GoToPreviousPage />
                            </div>
                            <div style={{ padding: "0 2px" }}>
                                <CurrentPageInput />
                            </div>
                            <div style={{ padding: "0 2px" }}>
                                <NumberOfPages />
                            </div>
                            <div style={{ padding: "0 2px" }}>
                                <GoToNextPage />
                            </div>
                            <div style={{ padding: "0 2px" }}>
                                <EnterFullScreen />
                            </div>
                        </div>
                    );
                }}
            </Toolbar>
        ),
    });

    const fetchPage = useCallback(async (page: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/book/${id}/pages?page=${page}&limit=4`
            );
            const data = await response.arrayBuffer();
            return data;
        } catch (error) {
            console.error("Error fetching PDF page:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const loadInitialPages = useCallback(async () => {
        const firstPage = await fetchPage(1);
        if (firstPage) {
            setAllPages([firstPage]);
            setPdfUrl(URL.createObjectURL(new Blob([firstPage], { type: "application/pdf" })));
        }
    }, [fetchPage]);

    const loadMorePages = useCallback(async () => {
        const nextPage = currentPage + 1;
        const newPage = await fetchPage(nextPage);
        if (newPage) {
            const updatedPages = [...allPages, newPage];
            setAllPages(updatedPages);
            setPdfUrl(URL.createObjectURL(new Blob(updatedPages, { type: "application/pdf" })));
            setCurrentPage(nextPage);
        }
    }, [currentPage, allPages, fetchPage]);

    const handleScroll = useCallback(() => {
        if (!viewerRef.current || isLoading) return;

        const viewerContainer = viewerRef.current.getViewerContainer();
        if (!viewerContainer) return;

        const { scrollTop, scrollHeight, clientHeight } = viewerContainer;
        const scrollPosition = scrollTop + clientHeight;

        // Load more when 80% scrolled
        if (scrollPosition > scrollHeight * 0.8) {
            loadMorePages();
        }
    }, [isLoading, loadMorePages]);

    useEffect(() => {
        loadInitialPages();
    }, [loadInitialPages]);

    useEffect(() => {
        const viewerContainer = viewerRef.current?.getViewerContainer();
        if (viewerContainer) {
            viewerContainer.addEventListener("scroll", handleScroll);
            return () => viewerContainer.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    return (
        <main>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
                <div style={{ height: "100vh", position: "relative" }}>
                    {pdfUrl ? (
                        <Viewer
                            fileUrl={pdfUrl}
                            plugins={[defaultLayoutPluginInstance]}
                            ref={viewerRef}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            {/*<Spinner />*/}
                       <p>loading</p>
                        </div>
                    )}
                    {isLoading && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow">
                            {/*<Spinner />*/}
                        <p>loading</p>
                        </div>
                    )}
                </div>
            </Worker>
        </main>
    );
}
// "use client"
// import React, { useState, useEffect } from 'react';
// import {useParams} from "next/navigation";
//
// export default function PDFViewer() {
//     const [pdfUrl, setPdfUrl] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState("");
//     const params = useParams();
//     const id = params?.id as string;
//     useEffect(() => {
//         const fetchPDF = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/api/book/${id}/pages?page=1&limit=4`);
//
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch PDF');
//                 }
//
//                 const blob = await response.blob();
//                 const url = URL.createObjectURL(blob);
//                 setPdfUrl(url);
//                 setIsLoading(false);
//             } catch (err: unknown) {
//                 console.error('Error fetching PDF:', err);
//                 setError("Error");
//                 setIsLoading(false);
//             }
//         };
//
//         fetchPDF();
//
//         return () => {
//             if (pdfUrl) {
//                 URL.revokeObjectURL(pdfUrl);
//             }
//         };
//     }, []);
//
//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }
//
//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                     Error: {error}
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="w-full h-screen p-4">
//             <style jsx global>{`
//         /* Hide toolbar and menu */
//         #plugin,
//         #toolbarContainer,
//         .toolbar {
//           display: none !important;
//         }
//
//         /* Prevent text selection */
//         object {
//           -webkit-touch-callout: none;
//           -webkit-user-select: none;
//           -khtml-user-select: none;
//           -moz-user-select: none;
//           -ms-user-select: none;
//           user-select: none;
//         }
//
//         /* Custom context menu prevention */
//         object::-webkit-context-menu {
//           display: none !important;
//         }
//       `}</style>
//             <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
//                 <object
//                     data={pdfUrl}
//                     type="application/pdf"
//                     className="w-full h-full"
//                     onContextMenu={(e) => e.preventDefault()}
//                 >
//                     <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                         <p className="text-gray-500">
//                             Unable to display PDF. Please ensure your browser supports PDF viewing.
//                         </p>
//                     </div>
//                 </object>
//             </div>
//         </div>
//     );
// }
//
