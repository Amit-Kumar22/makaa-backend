'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ProductForm from '@/components/admin/ProductForm';
import { productApi } from '@/services/api';
import { Product } from '@/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/login');
      return;
    }
    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  const fetchProduct = async () => {
    try {
      const response = await productApi.getById(id);
      setProduct(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load product');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-dark-600">Loading product details...</div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-dark-900">Edit Product</h1>
        <p className="mt-2 text-dark-600">Update product details, pricing, image, and status.</p>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <ProductForm product={product} mode="edit" onComplete={() => {}} />
      </div>
    </div>
  );
}
