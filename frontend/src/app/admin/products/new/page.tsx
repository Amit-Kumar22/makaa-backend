'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-dark-900">Add New Product</h1>
        <p className="mt-2 text-dark-600">Create a new product with image, pricing, and features.</p>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <ProductForm mode="create" onComplete={() => {}} />
      </div>
    </div>
  );
}
