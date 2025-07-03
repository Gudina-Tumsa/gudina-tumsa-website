"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, ToolbarProps } from "@react-pdf-viewer/default-layout";
import { PDFDocument } from "pdf-lib";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Home() {
    const params = useParams();
    const id = params?.id as string;

    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [allPages, setAllPages] = useState<ArrayBuffer[]>([]);
    const [currentBatchPage, setCurrentBatchPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState<number | null>(null);

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
                        <div className={"flex flex-row  items-center  w-full justify-between px-[3%]"}>
                            <p className={"font-bold"}>GTL Reader</p>
                            <div className={"flex flex-row items-center"}>
                                <div style={{ padding: "0 2px" }}><ShowSearchPopover /></div>
                                <div style={{ padding: "0 2px" }}><ZoomOut /></div>
                                <div style={{ padding: "0 2px" }}><Zoom /></div>
                                <div style={{ padding: "0 2px" }}><ZoomIn /></div>

                                <div style={{ padding: "0 2px" }}><CurrentPageInput /></div>
                                <div style={{ padding: "0 2px" }}><NumberOfPages /></div>
                                <div style={{ padding: "0 2px" }}><GoToPreviousPage /></div>

                                <div style={{ padding: "0 2px" }}><GoToNextPage /></div>
                                <div style={{ padding: "0 2px" }}><EnterFullScreen /></div>
                            </div>

                        </div>
                    );
                }}
            </Toolbar>
        ),
    });

    const fetchPageBatch = useCallback(async (startPage: number) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/api/book/${id}/pages?page=${startPage}&limit=4`);
            if (!response.ok) throw new Error("Failed to fetch page batch");
            return await response.arrayBuffer();
        } catch (error) {
            console.error("Error fetching PDF pages:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const mergePdfs = useCallback(async (buffers: ArrayBuffer[]): Promise<string> => {
        const mergedPdf = await PDFDocument.create();
        for (const buffer of buffers) {
            const pdf = await PDFDocument.load(buffer);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach((page) => mergedPdf.addPage(page));
        }
        const mergedBytes = await mergedPdf.save();
        return URL.createObjectURL(new Blob([mergedBytes], { type: "application/pdf" }));
    }, []);

    const loadInitialPages = useCallback(async () => {
        const buffer = await fetchPageBatch(1);
        if (buffer) {
            const updatedPages = [buffer];
            setAllPages(updatedPages);
            const mergedUrl = await mergePdfs(updatedPages);
            setPdfUrl(mergedUrl);
            setCurrentBatchPage(5); // Next batch starts from page 5
        }
    }, [fetchPageBatch, mergePdfs]);

    const loadMorePages = useCallback(async () => {
        const buffer = await fetchPageBatch(currentBatchPage);
        if (buffer) {
            const updatedPages = [...allPages, buffer];
            setAllPages(updatedPages);
            const mergedUrl = await mergePdfs(updatedPages);
            setPdfUrl(mergedUrl);
            setCurrentBatchPage(currentBatchPage + 4);
        }
    }, [fetchPageBatch, currentBatchPage, allPages, mergePdfs]);

    const handleScroll = useCallback(() => {
        if (!viewerRef.current || isLoading) return;
        const container = viewerRef.current.getViewerContainer?.();
        if (!container) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const scrollPosition = scrollTop + clientHeight;

        if (scrollPosition > scrollHeight * 0.8) {
            loadMorePages();
        }
    }, [isLoading, loadMorePages]);

    useEffect(() => {
        const container = viewerRef.current?.getViewerContainer?.();
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    useEffect(() => {
        loadInitialPages();
    }, [loadInitialPages]);

    return (
        <main>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
                <div style={{ height: "100vh", position: "relative" }}>
                    {pdfUrl ? (
                        <Viewer
                            fileUrl={pdfUrl}
                            plugins={[defaultLayoutPluginInstance]}
                            onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
                            onPageChange={(e) => {
                                const current = e.currentPage + 1;
                                if (totalPages && current >= totalPages && !isLoading) {
                                    loadMorePages();
                                }
                            }}
                            ref={viewerRef}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p>Loading PDF...</p>
                        </div>
                    )}
                    {isLoading && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow">
                            <p>Loading more pages...</p>
                        </div>
                    )}
                </div>
            </Worker>
        </main>
    );
}
