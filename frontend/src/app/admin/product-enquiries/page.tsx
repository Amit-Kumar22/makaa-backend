'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FiSearch, FiTrash2, FiEye, FiX, FiFilter,
  FiRefreshCw, FiShoppingCart, FiPhone, FiMail,
  FiMessageCircle, FiUser,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { productEnquiryApi } from '@/services/api';
import { ProductEnquiry, ProductEnquiryStatus } from '@/types';

const STATUSES: ProductEnquiryStatus[] = [
  'New', 'Contacted', 'Follow Up', 'Interested', 'Converted', 'Closed',
];

const STATUS_META: Record<ProductEnquiryStatus, { bg: string; text: string; dot: string }> = {
  New:         { bg: 'bg-blue-100',    text: 'text-blue-700',    dot: 'bg-blue-500' },
  Contacted:   { bg: 'bg-purple-100',  text: 'text-purple-700',  dot: 'bg-purple-500' },
  'Follow Up': { bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-500' },
  Interested:  { bg: 'bg-cyan-100',    text: 'text-cyan-700',    dot: 'bg-cyan-500' },
  Converted:   { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Closed:      { bg: 'bg-slate-100',   text: 'text-slate-600',   dot: 'bg-slate-400' },
};

const fmt = (s: string) =>
  new Date(s).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

// ─── Detail modal ─────────────────────────────────────────────────────────────

interface DetailModalProps {
  enquiry: ProductEnquiry;
  onClose: () => void;
  onUpdate: (id: string, status: ProductEnquiryStatus, notes: string) => Promise<void>;
}

function DetailModal({ enquiry, onClose, onUpdate }: DetailModalProps) {
  const [status, setStatus] = useState<ProductEnquiryStatus>(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes || '');
  const [saving, setSaving] = useState(false);

  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919818205383';
  const whatsappMsg = encodeURIComponent(
    `Hello ${enquiry.userName},\n\nThank you for your interest in *${enquiry.productName}*.\n\nWe have received your enquiry and will share complete details shortly.\n\nRegards,\nMakka Team`
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(enquiry._id, status, notes);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const statusMeta = STATUS_META[status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl bg-primary-600 px-6 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-200">
              Enquiry #{enquiry._id.slice(-6).toUpperCase()}
            </p>
            <h2 className="text-lg font-bold text-white truncate">{enquiry.productName}</h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_META[enquiry.status].bg} ${STATUS_META[enquiry.status].text}`}>
              {enquiry.status}
            </span>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* ── Contact User ─────────────────────────────── */}
          <section>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-dark-400">
              <FiUser size={12} /> Contact User
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${enquiry.mobile}`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
              >
                <FiPhone size={14} /> Call {enquiry.mobile}
              </a>
              <a
                href={`mailto:${enquiry.email}?subject=Regarding your enquiry for ${enquiry.productName}&body=Dear ${enquiry.userName},%0D%0A%0D%0AThank you for your interest in ${enquiry.productName}.%0D%0A%0D%0ARegards,%0D%0AMakka Team`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition"
              >
                <FiMail size={14} /> Email {enquiry.email}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#20b857] transition"
              >
                <FiMessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </section>

          {/* ── User info ────────────────────────────────── */}
          <section className="rounded-2xl border border-dark-100 bg-dark-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-400">
              User Information
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-sm">
              <InfoCell label="Full Name"     value={enquiry.userName} />
              <InfoCell label="Mobile"        value={enquiry.mobile} />
              <InfoCell label="Email"         value={enquiry.email} />
              <InfoCell label="City"          value={enquiry.city || '—'} />
              <InfoCell label="State"         value={enquiry.state || '—'} />
              <InfoCell label="Organization"  value={enquiry.organizationName || '—'} />
            </div>
          </section>

          {/* ── Product info ─────────────────────────────── */}
          <section className="rounded-2xl border border-dark-100 bg-dark-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-400">
              Product Information
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-sm">
              <InfoCell label="Product Name" value={enquiry.productName} />
              <InfoCell label="Category"     value={enquiry.productCategory || '—'} />
              <InfoCell label="Price"        value={enquiry.productPrice ? `₹${enquiry.productPrice}` : '—'} />
              <InfoCell label="Product ID"   value={enquiry.productId ? String(enquiry.productId).slice(-8).toUpperCase() : '—'} />
              <InfoCell label="Source"       value={enquiry.source} />
              <InfoCell label="Date & Time"  value={fmt(enquiry.createdAt)} />
            </div>
          </section>

          {/* ── Enquiry info ─────────────────────────────── */}
          <section className="rounded-2xl border border-dark-100 bg-dark-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-400">
              Enquiry Information
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-sm">
              <InfoCell label="Enquiry ID"  value={`#${enquiry._id.slice(-6).toUpperCase()}`} />
              <InfoCell label="Date"        value={fmt(enquiry.createdAt)} />
              <InfoCell label="Status"      value={enquiry.status} highlight />
            </div>
            {enquiry.notes && (
              <div className="mt-3">
                <p className="mb-1 text-xs font-semibold text-dark-400">Previous Notes</p>
                <p className="text-sm text-dark-700 rounded-xl bg-white border border-dark-200 px-3 py-2">
                  {enquiry.notes}
                </p>
              </div>
            )}
          </section>

          {/* ── Update status ────────────────────────────── */}
          <section className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-dark-400">
              Update Status & Notes
            </p>

            {/* Status buttons */}
            <div className="grid grid-cols-3 gap-2">
              {STATUSES.map((s) => {
                const m = STATUS_META[s];
                const active = status === s;
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold border transition ${
                      active
                        ? `${m.bg} ${m.text} border-current`
                        : 'border-dark-200 text-dark-600 bg-white hover:border-dark-300'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full shrink-0 ${active ? m.dot : 'bg-dark-300'}`} />
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-dark-500">
                Add Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add internal notes about this enquiry…"
                className="w-full rounded-xl border border-dark-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60 transition"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}

function InfoCell({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl bg-white border border-dark-100 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-dark-400 mb-0.5">{label}</p>
      <p className={`text-sm font-medium truncate ${highlight ? 'text-primary-600' : 'text-dark-800'}`}>
        {value}
      </p>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function ProductEnquiriesPage() {
  const router = useRouter();
  const [enquiries, setEnquiries]   = useState<ProductEnquiry[]>([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState<ProductEnquiry | null>(null);

  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('');
  const [startDate, setStartDate]   = useState('');
  const [endDate, setEndDate]       = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) { router.push('/login'); return; }
    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search.trim())   params.search    = search.trim();
      if (statusFilter)    params.status    = statusFilter;
      if (startDate)       params.startDate = startDate;
      if (endDate)         params.endDate   = endDate;

      const res = await productEnquiryApi.getAll(params);
      setEnquiries(res.data.enquiries);
      setTotal(res.data.total);
    } catch {
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, startDate, endDate]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete enquiry for "${name}"?`)) return;
    try {
      await productEnquiryApi.delete(id);
      toast.success('Enquiry deleted');
      fetchEnquiries();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleUpdate = async (id: string, status: ProductEnquiryStatus, notes: string) => {
    await productEnquiryApi.updateStatus(id, { status, notes });
    toast.success('Enquiry updated');
    fetchEnquiries();
  };

  const clearFilters = () => { setSearch(''); setStatus(''); setStartDate(''); setEndDate(''); };
  const hasFilters = search || statusFilter || startDate || endDate;

  // Status counts for chips
  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = enquiries.filter((e) => e.status === s).length;
    return acc;
  }, {});

  return (
    <>
      <div className="p-6 lg:p-8">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-900 flex items-center gap-2">
              <FiShoppingCart className="text-primary-600" /> Product Enquiries
            </h1>
            <p className="text-dark-500 mt-1 text-sm">
              {total} total enquier{total !== 1 ? 'ies' : 'y'} from registered users
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchEnquiries}
              className="inline-flex items-center gap-2 rounded-2xl border border-dark-200 bg-white px-4 py-2.5 text-sm font-medium text-dark-700 hover:bg-dark-50 transition"
            >
              <FiRefreshCw size={14} /> Refresh
            </button>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-dark-200 bg-white px-4 py-2.5 text-sm font-medium text-dark-700 hover:bg-dark-50 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* ── Status chips ────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setStatus('')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition ${
              !statusFilter
                ? 'border-primary-500 bg-primary-600 text-white'
                : 'border-dark-200 bg-white text-dark-600 hover:border-dark-300'
            }`}
          >
            All ({total})
          </button>
          {STATUSES.map((s) => {
            const m = STATUS_META[s];
            const active = statusFilter === s;
            return (
              <button
                key={s}
                onClick={() => setStatus(active ? '' : s)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border transition ${
                  active
                    ? `${m.bg} ${m.text} border-current`
                    : 'border-dark-200 bg-white text-dark-600 hover:border-dark-300'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                {s} ({counts[s] ?? 0})
              </button>
            );
          })}
        </div>

        {/* ── Filters ─────────────────────────────────── */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_200px_160px_160px_auto] mb-4">
          <div className="relative">
            <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchEnquiries()}
              placeholder="Search name, mobile, email, product…"
              className="w-full rounded-xl border border-dark-300 bg-white pl-9 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-dark-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            type="date" value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            title="From date"
            className="rounded-xl border border-dark-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
          />
          <input
            type="date" value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            title="To date"
            className="rounded-xl border border-dark-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={fetchEnquiries}
              className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition"
            >
              <FiFilter size={14} />
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="rounded-xl border border-dark-200 px-4 py-2.5 text-sm text-dark-600 hover:bg-dark-50 transition"
                title="Clear filters"
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ── Table ───────────────────────────────────── */}
        {loading ? (
          <div className="py-16 text-center text-dark-500">Loading enquiries…</div>
        ) : enquiries.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-dark-200 bg-dark-50 py-16 text-center text-dark-500">
            No enquiries found{hasFilters ? ' matching current filters' : ''}.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-dark-100 shadow-sm">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-dark-50 text-left">
                <tr>
                  {['#', 'User Information', 'Product', 'Date & Time', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100 bg-white">
                {enquiries.map((enq, idx) => {
                  const m = STATUS_META[enq.status];
                  return (
                    <tr key={enq._id} className="hover:bg-dark-50 transition">
                      <td className="px-4 py-3 text-xs text-dark-400 tabular-nums">{idx + 1}</td>

                      {/* User info */}
                      <td className="px-4 py-3">
                        <p className="font-semibold text-dark-900">{enq.userName}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                          <a href={`tel:${enq.mobile}`} className="text-xs text-dark-500 hover:text-primary-600 flex items-center gap-0.5">
                            <FiPhone size={10} /> {enq.mobile}
                          </a>
                          <a href={`mailto:${enq.email}`} className="text-xs text-dark-400 hover:text-primary-600 truncate max-w-[160px]">
                            {enq.email}
                          </a>
                        </div>
                        {(enq.city || enq.state) && (
                          <p className="text-xs text-dark-400 mt-0.5">
                            {[enq.city, enq.state].filter(Boolean).join(', ')}
                          </p>
                        )}
                      </td>

                      {/* Product */}
                      <td className="px-4 py-3">
                        <p className="font-medium text-dark-800 line-clamp-1">{enq.productName}</p>
                        {enq.productCategory && (
                          <p className="text-xs text-dark-400">{enq.productCategory}</p>
                        )}
                        {enq.productPrice && (
                          <p className="text-xs font-semibold text-primary-600">₹{enq.productPrice}</p>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-xs text-dark-500 whitespace-nowrap">
                        {fmt(enq.createdAt)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${m.bg} ${m.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                          {enq.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelected(enq)}
                            title="View & Edit"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-700 hover:bg-primary-200 transition"
                          >
                            <FiEye size={14} />
                          </button>
                          <a
                            href={`tel:${enq.mobile}`}
                            title="Call user"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
                          >
                            <FiPhone size={13} />
                          </a>
                          <a
                            href={`mailto:${enq.email}`}
                            title="Email user"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                          >
                            <FiMail size={13} />
                          </a>
                          <button
                            onClick={() => handleDelete(enq._id, enq.productName)}
                            title="Delete"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail / edit modal */}
      {selected && (
        <DetailModal
          enquiry={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
