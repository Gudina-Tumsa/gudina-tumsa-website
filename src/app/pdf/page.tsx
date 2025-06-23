"use client"
import React, { useState, useEffect } from 'react';

export default function PDFViewer() {
    const [pdfUrl, setPdfUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/book/5deef59a-c59a-43d3-aa8d-0f8dfa93a451.pdf/pages?page=1&limit=4');

                if (!response.ok) {
                    throw new Error('Failed to fetch PDF');
                }

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching PDF:', err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchPDF();

        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen p-4">
            <style jsx global>{`
        /* Hide toolbar and menu */
        #plugin,
        #toolbarContainer,
        .toolbar {
          display: none !important;
        }
        
        /* Prevent text selection */
        object {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Custom context menu prevention */
        object::-webkit-context-menu {
          display: none !important;
        }
      `}</style>
            <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
                <object
                    data={pdfUrl}
                    type="application/pdf"
                    className="w-full h-full"
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <p className="text-gray-500">
                            Unable to display PDF. Please ensure your browser supports PDF viewing.
                        </p>
                    </div>
                </object>
            </div>
        </div>
    );
}