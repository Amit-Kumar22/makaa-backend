'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  FiAward, FiUpload, FiX, FiFileText, FiEye,
  FiHash, FiUser, FiCalendar, FiBriefcase,
} from 'react-icons/fi';
import { certificationApi } from '@/services/api';
import { Certification } from '@/types';

interface CertificationFormProps {
  certification?: Certification;
  mode: 'create' | 'edit';
  onComplete: () => void;
}

const CERT_STATUS_OPTIONS = ['Active', 'Expired', 'Pending', 'N/A'] as const;

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function CertificationForm({ certification, mode, onComplete }: CertificationFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: certification?.title ?? '',
    description: certification?.description ?? '',
    imageUrl: certification?.imageUrl ?? '',
    pdfUrl: certification?.pdfUrl ?? '',
    pdfName: certification?.pdfName ?? '',
    pdfSize: certification?.pdfSize ?? 0,
    certificateNumber: certification?.certificateNumber ?? '',
    recipientName: certification?.recipientName ?? '',
    issueDate: certification?.issueDate ? certification.issueDate.substring(0, 10) : '',
    expiryDate: certification?.expiryDate ? certification.expiryDate.substring(0, 10) : '',
    organizationName: certification?.organizationName ?? '',
    certStatus: certification?.certStatus ?? 'Active',
    displayOrder: certification?.displayOrder?.toString() ?? '0',
    isActive: certification?.isActive ?? true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(certification?.imageUrl ?? '');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);

  // Object URL for image preview
  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setPdfFile(file);
    setFormData((prev) => ({
      ...prev,
      pdfName: file.name,
      pdfSize: file.size,
    }));
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setFormData((prev) => ({ ...prev, pdfUrl: '', pdfName: '', pdfSize: 0 }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Certification title is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setSubmitting(true);

      // Upload image if a new file is selected
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append('image', imageFile);
        const res = await certificationApi.uploadImage(uploadForm);
        imageUrl = res.data.imageUrl;
      }

      // Upload PDF if a new file is selected
      let pdfUrl = formData.pdfUrl;
      let pdfName = formData.pdfName;
      let pdfSize = formData.pdfSize;
      if (pdfFile) {
        const uploadForm = new FormData();
        uploadForm.append('pdf', pdfFile);
        const res = await certificationApi.uploadPdf(uploadForm);
        pdfUrl = res.data.pdfUrl;
        pdfName = res.data.pdfName;
        pdfSize = res.data.pdfSize;
      }

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        imageUrl,
        pdfUrl,
        pdfName,
        pdfSize,
        certificateNumber: formData.certificateNumber.trim(),
        recipientName: formData.recipientName.trim(),
        issueDate: formData.issueDate || null,
        expiryDate: formData.expiryDate || null,
        organizationName: formData.organizationName.trim(),
        certStatus: formData.certStatus,
        displayOrder: Number(formData.displayOrder) || 0,
        isActive: formData.isActive,
      };

      if (mode === 'create') {
        await certificationApi.create(payload);
        toast.success('Certification created successfully');
      } else if (certification) {
        await certificationApi.update(certification._id, payload);
        toast.success('Certification updated successfully');
      }

      onComplete();
      router.push('/admin/certifications');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Unable to save certification');
    } finally {
      setSubmitting(false);
    }
  };

  // Determine displayed PDF info (new file takes precedence over existing)
  const displayPdfName = pdfFile ? pdfFile.name : formData.pdfName;
  const displayPdfSize = pdfFile ? pdfFile.size : formData.pdfSize;
  const hasPdf = Boolean(pdfFile || formData.pdfUrl);
  const existingPdfUrl = !pdfFile ? formData.pdfUrl : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Basic info ─────────────────────────────────────── */}
      <div>
        <label className="block mb-2 text-sm font-medium text-dark-700">
          Certification Title <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="e.g. FSSAI, IEC, APEDA"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-dark-700">
          Description <span className="text-dark-400 text-xs">(optional)</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="Brief description of this certification"
        />
      </div>

      {/* ── Certificate metadata ───────────────────────────── */}
      <div className="rounded-2xl border border-dark-100 bg-dark-50 p-5 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-dark-500">
          Certificate Details
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-dark-700">
              <span className="inline-flex items-center gap-1.5">
                <FiHash size={13} /> Certificate Number
              </span>
            </label>
            <input
              name="certificateNumber"
              value={formData.certificateNumber}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="e.g. FSSAI-2024-001"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-dark-700">
              <span className="inline-flex items-center gap-1.5">
                <FiUser size={13} /> Recipient Name
              </span>
            </label>
            <input
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Company or individual name"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-dark-700">
              <span className="inline-flex items-center gap-1.5">
                <FiBriefcase size={13} /> Issuing Organization
              </span>
            </label>
            <input
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="e.g. Food Safety Standards Authority"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-dark-700">Certificate Status</label>
            <select
              name="certStatus"
              value={formData.certStatus}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              {CERT_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-dark-700">
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar size={13} /> Issue Date
              </span>
            </label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-dark-700">
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar size={13} /> Expiry Date
                <span className="text-dark-400 text-xs">(optional)</span>
              </span>
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>
      </div>

      {/* ── Display settings ───────────────────────────────── */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-dark-700">Display Order</label>
          <input
            name="displayOrder"
            type="number"
            min="0"
            value={formData.displayOrder}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="0"
          />
          <p className="mt-1 text-xs text-dark-400">Lower numbers appear first.</p>
        </div>

        <div className="flex flex-col justify-center">
          <label className="block mb-2 text-sm font-medium text-dark-700">Visibility</label>
          <label className="inline-flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-dark-700">
              {formData.isActive ? 'Active — visible on website' : 'Inactive — hidden from website'}
            </span>
          </label>
        </div>
      </div>

      {/* ── Image upload ───────────────────────────────────── */}
      <div>
        <label className="block mb-2 text-sm font-medium text-dark-700">
          Certification Image <span className="text-dark-400 text-xs">(optional — JPG, PNG, WEBP)</span>
        </label>

        {imagePreview ? (
          <div className="relative mb-3 inline-block">
            <div className="h-40 w-40 overflow-hidden rounded-2xl border border-dark-200 bg-dark-50">
              <img
                src={imagePreview}
                alt="Certification preview"
                className="h-full w-full object-contain p-2"
              />
            </div>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
              title="Remove image"
            >
              <FiX size={12} />
            </button>
          </div>
        ) : (
          <div className="mb-3 flex h-40 w-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-dark-200 bg-dark-50">
            <FiAward size={32} className="text-dark-300 mb-1" />
            <span className="text-xs text-dark-400">No image</span>
          </div>
        )}

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dark-300 bg-white px-4 py-2 text-sm text-dark-700 transition hover:bg-dark-50">
          <FiUpload size={14} />
          {imagePreview ? 'Replace Image' : 'Upload Image'}
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* ── PDF upload ─────────────────────────────────────── */}
      <div>
        <label className="block mb-2 text-sm font-medium text-dark-700">
          Certificate PDF <span className="text-dark-400 text-xs">(optional — PDF only, max 50 MB)</span>
        </label>

        {hasPdf ? (
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-dark-200 bg-dark-50 px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <FiFileText size={20} className="text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-800 truncate">{displayPdfName || 'certificate.pdf'}</p>
              {displayPdfSize > 0 && (
                <p className="text-xs text-dark-400">{formatFileSize(displayPdfSize)}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {existingPdfUrl && (
                <a
                  href={existingPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition hover:bg-primary-100"
                  title="Preview PDF"
                >
                  <FiEye size={12} /> Preview
                </a>
              )}
              <button
                type="button"
                onClick={handleRemovePdf}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-600 transition hover:bg-red-200"
                title="Remove PDF"
              >
                <FiX size={13} />
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-3 flex h-24 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-dark-200 bg-dark-50 gap-1">
            <FiFileText size={28} className="text-dark-300" />
            <span className="text-xs text-dark-400">No PDF uploaded</span>
          </div>
        )}

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dark-300 bg-white px-4 py-2 text-sm text-dark-700 transition hover:bg-dark-50">
          <FiUpload size={14} />
          {hasPdf ? 'Replace PDF' : 'Upload PDF'}
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="hidden"
          />
        </label>
      </div>

      {/* ── Submit ─────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? 'Saving…'
          : mode === 'create'
          ? 'Create Certification'
          : 'Update Certification'}
      </button>
    </form>
  );
}
