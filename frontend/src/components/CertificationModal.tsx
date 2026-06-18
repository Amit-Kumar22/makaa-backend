'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  FiX,
  FiAward,
  FiHash,
  FiUser,
  FiCalendar,
  FiBriefcase,
  FiFileText,
  FiDownload,
  FiExternalLink,
} from 'react-icons/fi';
import { Certification } from '@/types';

// Dynamically import the PDF viewer to avoid SSR issues
const CertificatePDFViewer = dynamic(() => import('./CertificatePDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
  ),
});

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes || bytes === 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Expired: 'bg-red-100 text-red-700 border-red-200',
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
  'N/A': 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function CertificationModal({ certification, isOpen, onClose }: CertificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleDownload = async () => {
    if (!certification?.pdfUrl) return;
    try {
      const response = await fetch(certification.pdfUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = certification.pdfName || `${certification.title}.pdf`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 200);
    } catch {
      window.open(certification.pdfUrl, '_blank');
    }
  };

  if (!certification) return null;

  const statusLabel = certification.certStatus || 'N/A';
  const statusClass = statusColors[statusLabel] ?? statusColors['N/A'];
  const hasPdf = Boolean(certification.pdfUrl);

  const metaFields = [
    {
      icon: <FiHash size={14} />,
      label: 'Certificate No.',
      value: certification.certificateNumber || '—',
    },
    {
      icon: <FiUser size={14} />,
      label: 'Issued To',
      value: certification.recipientName || '—',
    },
    {
      icon: <FiBriefcase size={14} />,
      label: 'Issuing Organization',
      value: certification.organizationName || '—',
    },
    {
      icon: <FiCalendar size={14} />,
      label: 'Issue Date',
      value: formatDate(certification.issueDate),
    },
    {
      icon: <FiCalendar size={14} />,
      label: 'Expiry Date',
      value: formatDate(certification.expiryDate),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col"
              initial={{ scale: 0.94, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 24 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header ───────────────────────────────────── */}
              <div className="flex items-center gap-3 bg-primary-600 px-6 py-4 shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <FiAward size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-white truncate">{certification.title}</h2>
                  {certification.description && (
                    <p className="text-xs text-primary-200 truncate">{certification.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {/* Status badge */}
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}>
                    {statusLabel}
                  </span>
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
                    title="Close"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>

              {/* ── Scrollable body ───────────────────────────── */}
              <div className="overflow-y-auto flex-1 p-6 space-y-6">

                {/* Certificate metadata grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {metaFields.map((field) => (
                    <div
                      key={field.label}
                      className="flex items-start gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <span className="mt-0.5 text-primary-500 shrink-0">{field.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {field.label}
                        </p>
                        <p className="text-sm font-medium text-slate-800 break-words">{field.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── PDF section ───────────────────────────── */}
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FiFileText size={16} className="text-primary-600" />
                      <h3 className="text-sm font-semibold text-slate-800">Certificate PDF</h3>
                      {certification.pdfName && (
                        <span className="text-xs text-slate-400 truncate max-w-[200px]">
                          {certification.pdfName}
                          {certification.pdfSize ? ` (${formatFileSize(certification.pdfSize)})` : ''}
                        </span>
                      )}
                    </div>
                    {hasPdf && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={handleDownload}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition hover:bg-primary-100"
                        >
                          <FiDownload size={12} /> Download
                        </button>
                        <a
                          href={certification.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                          <FiExternalLink size={12} /> Open
                        </a>
                      </div>
                    )}
                  </div>

                  {hasPdf ? (
                    <div className="rounded-2xl border border-slate-200 overflow-hidden">
                      <CertificatePDFViewer
                        url={certification.pdfUrl!}
                        filename={certification.pdfName || `${certification.title}.pdf`}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center">
                      <FiFileText size={36} className="text-slate-300" />
                      <p className="text-sm font-medium text-slate-500">No PDF attached</p>
                      <p className="text-xs text-slate-400">
                        A PDF has not been uploaded for this certification.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
