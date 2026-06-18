'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiAward, FiUpload, FiX, FiArrowLeft } from 'react-icons/fi';
import { whyChooseUsApi } from '@/services/api';

export default function NewWhyChooseUsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    displayOrder: '0',
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) router.push('/login');
  }, [router]);

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { toast.error('Title is required'); return; }
    try {
      setSubmitting(true);
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const fd = new FormData();
        fd.append('image', imageFile);
        const res = await whyChooseUsApi.uploadImage(fd);
        imageUrl = res.data.imageUrl;
      }
      await whyChooseUsApi.create({
        title: formData.title.trim(),
        description: formData.description.trim(),
        imageUrl,
        displayOrder: Number(formData.displayOrder) || 0,
        isActive: formData.isActive,
      });
      toast.success('Item created successfully');
      router.push('/admin/why-choose-us');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/why-choose-us" className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-200 hover:bg-dark-50 transition">
          <FiArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-900">Add New Item</h1>
          <p className="text-dark-500 text-sm mt-0.5">Add a new feature card to Why Choose Us.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-dark-100 shadow-sm p-6 space-y-5">

        <div>
          <label className="block mb-1.5 text-sm font-medium text-dark-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title" value={formData.title} onChange={handleChange}
            className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="e.g. Export Quality Products"
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-medium text-dark-700">
            Description <span className="text-dark-400 text-xs">(optional)</span>
          </label>
          <textarea
            name="description" value={formData.description} onChange={handleChange} rows={3}
            className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="Brief description of this feature"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-dark-700">Display Order</label>
            <input
              type="number" min="0" name="displayOrder" value={formData.displayOrder} onChange={handleChange}
              className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-dark-400">Lower = appears first.</p>
          </div>
          <div className="flex flex-col justify-center">
            <label className="block mb-1.5 text-sm font-medium text-dark-700">Visibility</label>
            <label className="inline-flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange}
                className="h-5 w-5 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-dark-700">
                {formData.isActive ? 'Active — visible on website' : 'Inactive — hidden'}
              </span>
            </label>
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-dark-700">
            Icon / Image <span className="text-dark-400 text-xs">(optional — JPG, PNG, WEBP, SVG)</span>
          </label>
          {imagePreview ? (
            <div className="relative mb-3 inline-block">
              <div className="h-32 w-32 overflow-hidden rounded-2xl border border-dark-200 bg-dark-50">
                <img src={imagePreview} alt="Preview" className="h-full w-full object-contain p-2" />
              </div>
              <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); setFormData((p) => ({ ...p, imageUrl: '' })); }}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FiX size={12} />
              </button>
            </div>
          ) : (
            <div className="mb-3 flex h-32 w-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-dark-200 bg-dark-50">
              <FiAward size={28} className="text-dark-300 mb-1" />
              <span className="text-xs text-dark-400">No image</span>
            </div>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dark-300 bg-white px-4 py-2 text-sm text-dark-700 hover:bg-dark-50 transition">
            <FiUpload size={14} />
            {imagePreview ? 'Replace Image' : 'Upload Image'}
            <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0] ?? null; setImageFile(f); }} />
          </label>
        </div>

        <button type="submit" disabled={submitting}
          className="w-full rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {submitting ? 'Saving…' : 'Create Item'}
        </button>
      </form>
    </div>
  );
}
