'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiZoomOut,
  FiDownload,
  FiPrinter,
  FiMaximize,
  FiMinimize,
  FiAlertCircle,
  FiExternalLink,
} from 'react-icons/fi';

// Use CDN worker matching the installed pdfjs-dist version
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface CertificatePDFViewerProps {
  url: string;
  filename?: string;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 3.0;
const SCALE_STEP = 0.25;

export default function CertificatePDFViewer({ url, filename }: CertificatePDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Track container width for responsive page sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width > 0) setContainerWidth(width);
    });
    observer.observe(containerRef.current);
    setContainerWidth(containerRef.current.clientWidth);
    return () => observer.disconnect();
  }, []);

  // Track fullscreen state changes
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setPageNumber(1);
    setIsLoading(false);
    setHasError(false);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  const prevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const nextPage = () => setPageNumber((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, parseFloat((s + SCALE_STEP).toFixed(2))));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, parseFloat((s - SCALE_STEP).toFixed(2))));

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'certificate.pdf';
      link.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 200);
    } catch {
      window.open(url, '_blank');
    }
  };

  const handlePrint = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
          URL.revokeObjectURL(blobUrl);
        }, 1000);
      };
    } catch {
      window.open(url, '_blank');
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  // Base page width fits the container; scale is applied on top
  const baseWidth = containerWidth > 0 ? Math.min(containerWidth - 40, 780) : 680;
  const pageWidth = baseWidth * scale;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-slate-100 rounded-xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-[9999] rounded-none' : ''
      }`}
    >
      {/* ── Toolbar ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-800 px-3 py-2 text-white shrink-0">
        {/* Page navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevPage}
            disabled={pageNumber <= 1 || isLoading}
            className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            title="Previous page"
          >
            <FiChevronLeft size={17} />
          </button>
          <span className="text-xs text-slate-300 w-[90px] text-center tabular-nums">
            {isLoading ? '…' : `Page ${pageNumber} of ${numPages}`}
          </span>
          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages || isLoading}
            className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            title="Next page"
          >
            <FiChevronRight size={17} />
          </button>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={scale <= MIN_SCALE}
            className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            title="Zoom out"
          >
            <FiZoomOut size={17} />
          </button>
          <span className="text-xs text-slate-300 w-12 text-center tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={scale >= MAX_SCALE}
            className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            title="Zoom in"
          >
            <FiZoomIn size={17} />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg hover:bg-slate-700 transition"
            title="Download PDF"
          >
            <FiDownload size={17} />
          </button>
          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg hover:bg-slate-700 transition"
            title="Print PDF"
          >
            <FiPrinter size={17} />
          </button>
          <button
            onClick={handleFullscreen}
            className="p-1.5 rounded-lg hover:bg-slate-700 transition"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <FiMinimize size={17} /> : <FiMaximize size={17} />}
          </button>
        </div>
      </div>

      {/* ── PDF content area ─────────────────────────────── */}
      <div
        className="flex-1 overflow-auto p-4 flex justify-center"
        style={{ maxHeight: isFullscreen ? 'calc(100vh - 52px)' : '65vh', minHeight: '300px' }}
      >
        {hasError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-slate-500">
            <FiAlertCircle size={40} className="text-red-400" />
            <p className="text-sm font-medium text-slate-700">Failed to load PDF</p>
            <p className="text-xs text-slate-500">The file may be unavailable or corrupted.</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-medium text-primary-700 hover:bg-primary-100 transition"
            >
              <FiExternalLink size={13} /> Open in new tab
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {/* Skeleton shown while loading */}
            {isLoading && (
              <div className="space-y-2 w-full" style={{ width: baseWidth }}>
                <div className="h-[500px] animate-pulse rounded-xl bg-slate-200" />
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: isLoading ? 'none' : 'block' }}>
              <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
              >
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth}
                  renderAnnotationLayer
                  renderTextLayer
                  loading={
                    <div
                      className="animate-pulse rounded-xl bg-slate-200"
                      style={{ width: pageWidth, height: pageWidth * 1.414 }}
                    />
                  }
                />
              </Document>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
