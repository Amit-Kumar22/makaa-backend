'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FiEdit, FiTrash2, FiPlus, FiToggleLeft, FiToggleRight,
  FiAward, FiFileText, FiEye, FiCalendar,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { certificationApi } from '@/services/api';
import { Certification } from '@/types';
import CertificationModal from '@/components/CertificationModal';

const getCacheSafeUrl = (url: string | undefined, updatedAt?: string) => {
  if (!url) return undefined;
  const token = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  return url.includes('?') ? `${url}&v=${token}` : `${url}?v=${token}`;
};

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes || bytes === 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const STATUS_COLORS: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Expired: 'bg-red-100 text-red-700',
  Pending: 'bg-amber-100 text-amber-700',
  'N/A': 'bg-slate-100 text-slate-600',
};

export default function CertificationsManagement() {
  const router = useRouter();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/login');
      return;
    }
    fetchCertifications();
  }, [router]);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const response = await certificationApi.getAdminAll();
      setCertifications(response.data);
    } catch {
      toast.error('Failed to fetch certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will also remove the associated PDF.`)) return;
    try {
      await certificationApi.delete(id);
      toast.success('Certification deleted successfully');
      fetchCertifications();
    } catch {
      toast.error('Failed to delete certification');
    }
  };

  const handleToggleStatus = async (cert: Certification) => {
    try {
      await certificationApi.update(cert._id, { isActive: !cert.isActive });
      toast.success(`Certification ${cert.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchCertifications();
    } catch {
      toast.error('Failed to update certification status');
    }
  };

  const openPreview = (cert: Certification) => {
    setPreviewCert(cert);
    setPreviewOpen(true);
  };

  const filtered = certifications.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && c.isActive) ||
      (filterStatus === 'inactive' && !c.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Certifications Management</h1>
            <p className="text-dark-600 mt-2">
              Add, edit, and manage certifications displayed on the website.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admin/certifications/new"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              <FiPlus /> Add Certification
            </Link>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-dark-200 bg-white px-6 py-3 text-sm font-semibold text-dark-900 transition hover:bg-dark-50"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-3 sm:flex-row mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search certifications..."
            className="flex-1 rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
            className="rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-dark-600">Loading certifications...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-dark-200 bg-dark-50 p-12 text-center text-dark-600">
            {certifications.length === 0
              ? 'No certifications found. Start by adding a new certification.'
              : 'No certifications match your search or filter.'}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((cert) => (
              <div
                key={cert._id}
                className="rounded-3xl border border-dark-100 bg-white p-5 shadow-sm transition hover:shadow-lg flex flex-col"
              >
                {/* Image or placeholder */}
                {cert.imageUrl ? (
                  <div className="mb-4 h-28 w-full overflow-hidden rounded-2xl bg-dark-100">
                    <img
                      src={getCacheSafeUrl(cert.imageUrl, cert.updatedAt)}
                      alt={cert.title}
                      className="h-full w-full object-contain p-2"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                ) : (
                  <div className="mb-4 flex h-28 w-full items-center justify-center rounded-2xl bg-dark-50">
                    <FiAward size={36} className="text-dark-300" />
                  </div>
                )}

                {/* Title + active status */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="text-base font-semibold text-dark-900 line-clamp-2">{cert.title}</h2>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      cert.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {cert.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Certificate status badge */}
                {cert.certStatus && cert.certStatus !== 'N/A' && (
                  <span
                    className={`mb-2 self-start rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      STATUS_COLORS[cert.certStatus] ?? STATUS_COLORS['N/A']
                    }`}
                  >
                    {cert.certStatus}
                  </span>
                )}

                {/* Description */}
                {cert.description && (
                  <p className="text-xs text-dark-500 mb-2 line-clamp-2">{cert.description}</p>
                )}

                {/* Metadata summary */}
                <div className="space-y-1 mb-3 flex-1">
                  {cert.certificateNumber && (
                    <p className="text-xs text-dark-500 truncate">
                      <span className="font-medium text-dark-600">No: </span>{cert.certificateNumber}
                    </p>
                  )}
                  {cert.recipientName && (
                    <p className="text-xs text-dark-500 truncate">
                      <span className="font-medium text-dark-600">To: </span>{cert.recipientName}
                    </p>
                  )}
                  {cert.issueDate && (
                    <p className="text-xs text-dark-500 flex items-center gap-1">
                      <FiCalendar size={11} className="shrink-0" />
                      {formatDate(cert.issueDate)}
                      {cert.expiryDate ? ` → ${formatDate(cert.expiryDate)}` : ''}
                    </p>
                  )}
                  {/* PDF indicator */}
                  {cert.pdfUrl ? (
                    <p className="text-xs text-primary-600 flex items-center gap-1 font-medium">
                      <FiFileText size={11} className="shrink-0" />
                      PDF attached
                      {cert.pdfSize ? ` (${formatFileSize(cert.pdfSize)})` : ''}
                    </p>
                  ) : (
                    <p className="text-xs text-dark-400 flex items-center gap-1">
                      <FiFileText size={11} className="shrink-0" /> No PDF
                    </p>
                  )}
                </div>

                <p className="text-xs text-dark-400 mb-4">Order: {cert.displayOrder}</p>

                {/* Actions */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleToggleStatus(cert)}
                    title={cert.isActive ? 'Deactivate' : 'Activate'}
                    className={`inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                      cert.isActive
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    {cert.isActive ? <FiToggleRight size={15} /> : <FiToggleLeft size={15} />}
                  </button>
                  <button
                    onClick={() => openPreview(cert)}
                    title="Preview certificate"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    <FiEye size={14} />
                  </button>
                  <Link
                    href={`/admin/certifications/${cert._id}/edit`}
                    className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-700"
                  >
                    <FiEdit size={13} />
                  </Link>
                  <button
                    onClick={() => handleDelete(cert._id, cert.title)}
                    className="inline-flex items-center justify-center rounded-2xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview modal */}
      <CertificationModal
        certification={previewCert}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}
