/* eslint-disable  */
// @ts-nocheck

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, ToolbarProps } from "@react-pdf-viewer/default-layout";
import { PDFDocument } from "pdf-lib";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {ReactReader} from "react-reader";

export default function Home() {
    const params = useParams();
    const id = params?.id as string;

    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [bookFormat, setBookFormat] = useState<"pdf" | "epub" | null>(null);
    const [location, setLocation] = useState<string>("");
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
                        <div className={"flex flex-row items-center justify-between px-[3%] w-full"}>
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

    const loadAllPages = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${id}/pages?page=1&limit=1000`);
            if (!response.ok) throw new Error("Failed to fetch book");

            const format = response.headers.get('X-Book-Format') as "pdf" | "epub" | null;
            setBookFormat(format);

            const buffer = await response.arrayBuffer();

            let mimeType = "";
            if (format === "pdf") {
                mimeType = "application/pdf";
            } else if (format === "epub") {
                mimeType = "application/epub+zip";
            } else {
                throw new Error("Unknown book format");
            }

            const blobUrl = URL.createObjectURL(new Blob([buffer], { type: mimeType }));
            setPdfUrl(blobUrl);
        } catch (error) {
            console.error("Error loading full book:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        loadAllPages();
    }, [id]);

    return (

            <main style={{ height: "100vh" }}>
                {bookFormat === "pdf" && pdfUrl && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
                    <div style={{ height: "100vh", position: "relative" }}>
                        {pdfUrl ? (
                            <Viewer
                                fileUrl={pdfUrl}
                                plugins={[defaultLayoutPluginInstance]}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p>Loading PDF...</p>
                            </div>
                        )}
                        {isLoading && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow">
                                <p>Loading book...</p>
                            </div>
                        )}
                    </div>
                </Worker>
                )}

                {bookFormat === "epub" && pdfUrl && (
                    <ReactReader
                        url={pdfUrl}
                        location={location}
                        locationChanged={setLocation}
                        showToc={true}
                        epubInitOptions={{
                            openAs: "epub",
                        }}
                    />
                )}

                {!bookFormat && (
                    <div className="flex items-center justify-center h-full">
                        <p>Loading book...</p>
                    </div>
                )}

        </main>
    );
}


