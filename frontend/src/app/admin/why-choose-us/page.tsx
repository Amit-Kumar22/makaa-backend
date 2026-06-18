'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FiPlus, FiEdit, FiTrash2, FiToggleLeft, FiToggleRight,
  FiCheckCircle, FiImage,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { whyChooseUsApi } from '@/services/api';
import { WhyChooseUsItem } from '@/types';

const getCacheSafe = (url?: string, updatedAt?: string) => {
  if (!url) return undefined;
  const t = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  return url.includes('?') ? `${url}&v=${t}` : `${url}?v=${t}`;
};

export default function WhyChooseUsAdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<WhyChooseUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) { router.push('/login'); return; }
    fetchItems();
  }, [router]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await whyChooseUsApi.getAdminAll();
      setItems(res.data);
    } catch {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await whyChooseUsApi.delete(id);
      toast.success('Deleted successfully');
      fetchItems();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleToggle = async (item: WhyChooseUsItem) => {
    try {
      await whyChooseUsApi.update(item._id, { isActive: !item.isActive });
      toast.success(`${item.isActive ? 'Deactivated' : 'Activated'} successfully`);
      fetchItems();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filtered = items.filter((item) => {
    const matchSearch = (item.title ?? '').toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'active' && item.isActive) ||
      (filter === 'inactive' && !item.isActive);
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-900 flex items-center gap-2">
            <FiCheckCircle className="text-accent-600" /> Why Choose Us
          </h1>
          <p className="text-dark-600 mt-1 text-sm">
            Manage the feature items shown in the Why Choose Us section.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/admin/why-choose-us/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition"
          >
            <FiPlus size={16} /> Add Item
          </Link>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-dark-200 bg-white px-5 py-2.5 text-sm font-semibold text-dark-700 hover:bg-dark-50 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items…"
          className="flex-1 rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className="rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-dark-100 bg-white p-5 shadow-sm">
              <div className="h-24 animate-pulse rounded-2xl bg-slate-200 mb-4" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 mb-2" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-dark-200 bg-dark-50 p-12 text-center text-dark-600">
          {items.length === 0
            ? 'No items yet. Click "Add Item" to create the first one.'
            : 'No items match your search or filter.'}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-dark-100 bg-white p-5 shadow-sm hover:shadow-lg transition flex flex-col"
            >
              {/* Image / placeholder */}
              {item.imageUrl ? (
                <div className="mb-4 flex h-24 w-full items-center justify-center overflow-hidden rounded-2xl bg-dark-50 border border-dark-100">
                  <img
                    src={getCacheSafe(item.imageUrl, item.updatedAt)}
                    alt={item.title}
                    className="h-full w-full object-contain p-2"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-24 w-full items-center justify-center rounded-2xl bg-dark-50">
                  <FiImage size={28} className="text-dark-300" />
                </div>
              )}

              {/* Title + status */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <h2 className="text-base font-semibold text-dark-900 line-clamp-2">{item.title}</h2>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  item.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {item.description && (
                <p className="text-xs text-dark-500 line-clamp-2 mb-2">{item.description}</p>
              )}

              <p className="text-xs text-dark-400 mb-4 flex-1">Order: {item.displayOrder}</p>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleToggle(item)}
                  title={item.isActive ? 'Deactivate' : 'Activate'}
                  className={`inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                    item.isActive
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  {item.isActive ? <FiToggleRight size={15} /> : <FiToggleLeft size={15} />}
                </button>
                <Link
                  href={`/admin/why-choose-us/${item._id}/edit`}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-3 py-2 text-xs font-semibold text-white hover:bg-primary-700 transition"
                >
                  <FiEdit size={13} />
                </Link>
                <button
                  onClick={() => handleDelete(item._id, item.title)}
                  className="inline-flex items-center justify-center rounded-2xl bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600 transition"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
