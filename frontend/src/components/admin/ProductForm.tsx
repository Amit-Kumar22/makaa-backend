'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { productApi } from '@/services/api';
import { Product } from '@/types';

interface ProductFormProps {
  product?: Product;
  mode: 'create' | 'edit';
  onComplete: () => void;
}

export default function ProductForm({ product, mode, onComplete }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product?.name ?? '',
    category: product?.category ?? '',
    shortDescription: product?.shortDescription ?? '',
    fullDescription: product?.fullDescription ?? '',
    price: product?.price?.toString() ?? '',
    discountPrice: product?.discountPrice?.toString() ?? '',
    features: product?.features?.join(', ') ?? '',
    isActive: product?.isActive ?? true,
    image: product?.image ?? '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product?.image ?? '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Product name is required';
    if (!formData.category.trim()) return 'Product category is required';
    if (!formData.shortDescription.trim()) return 'Short description is required';
    if (!formData.fullDescription.trim()) return 'Full description is required';
    if (!formData.image && !imageFile) return 'Product image is required';
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setSubmitting(true);
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append('image', imageFile);
        const uploadResponse = await productApi.uploadImage(uploadForm);
        imageUrl = uploadResponse.data.imageUrl;
      }

      const payload = {
        name: formData.name,
        category: formData.category,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        price: formData.price ? parseFloat(formData.price) : null,
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        features: formData.features,
        isActive: formData.isActive,
        image: imageUrl,
      };

      if (mode === 'create') {
        await productApi.create(payload);
        toast.success('Product created successfully');
        router.push('/admin/products');
      } else if (product) {
        await productApi.update(product._id, payload);
        toast.success('Product updated successfully');
        router.push('/admin/products');
      }

      onComplete();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Unable to save product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-dark-700">Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-dark-700">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="E.g. Feed, Industrial, Food"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-dark-700">Short Description</label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleInputChange}
          rows={3}
          className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="Brief summary for cards and lists"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-dark-700">Full Description</label>
        <textarea
          name="fullDescription"
          value={formData.fullDescription}
          onChange={handleInputChange}
          rows={5}
          className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="Detailed product information for the product details page"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="block mb-2 text-sm font-medium text-dark-700">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-dark-700">Discount Price</label>
          <input
            name="discountPrice"
            type="number"
            step="0.01"
            value={formData.discountPrice}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="Optional discounted price"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-dark-700">Status</label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-dark-700">Active</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-dark-700">Product Features</label>
        <input
          name="features"
          value={formData.features}
          onChange={handleInputChange}
          className="w-full rounded-xl border border-dark-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="Separate features with commas"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-dark-700">Product Image</label>
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
          className="block w-full text-sm text-dark-700 file:mr-4 file:rounded-full file:border-0 file:bg-primary-600 file:px-4 file:py-2 file:text-white"
        />
      </div>

      {imagePreview && (
        <div className="rounded-3xl overflow-hidden border border-dark-200 bg-dark-50">
          <img
            src={imagePreview}
            alt="Product preview"
            className="h-64 w-full object-cover"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
      </button>
    </form>
  );
}
