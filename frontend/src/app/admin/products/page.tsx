'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiEdit, FiTrash2, FiPlus, FiEye, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { productApi } from '@/services/api';
import { Product } from '@/types';

const getCacheSafeImage = (image: string | undefined, updatedAt?: string) => {
  if (!image) return undefined;
  const token = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  return image.includes('?') ? `${image}&v=${token}` : `${image}?v=${token}`;
};

export default function ProductManagement() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/admin-login');
      return;
    }
    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAdminAll();
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productApi.delete(id);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      await productApi.update(product._id, {
        name: product.name,
        category: product.category,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        price: product.price,
        discountPrice: product.discountPrice,
        features: product.features,
        image: product.image,
        isActive: !product.isActive,
      });
      toast.success(`Product ${product.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product status');
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Products Management</h1>
          <p className="text-dark-600 mt-2">Add, edit, remove, and manage all product listings.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            <FiPlus /> Add Product
          </Link>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-dark-200 bg-white px-6 py-3 text-sm font-semibold text-dark-900 transition hover:bg-dark-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-dark-600">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-dark-200 bg-dark-50 p-12 text-center text-dark-600">
          No products found. Start by adding a new product.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <div key={product._id} className="rounded-3xl border border-dark-100 bg-white p-4 shadow-sm transition hover:shadow-lg">
              <div className="grid gap-3 lg:grid-cols-[112px_1fr] items-start">
                <div className="h-28 w-full overflow-hidden rounded-3xl bg-dark-200 lg:w-28">
                  {product.image ? (
                    <img
                      src={getCacheSafeImage(product.image, product.updatedAt)}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-size="28" font-family="Arial,sans-serif">No image</text></svg>';
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-3xl">🌾</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-dark-900 line-clamp-2">{product.name}</h2>
                      <p className="text-xs text-dark-500 mt-1 line-clamp-1">{product.category}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${product.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-dark-600">
                    <span className="rounded-2xl bg-dark-50 px-3 py-2">Price</span>
                    <span className="rounded-2xl bg-dark-50 px-3 py-2 font-semibold text-dark-900">
                      {product.price ? `₹${product.price}` : 'N/A'}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <Link
                      href={`/product/${product._id}`}
                      className="inline-flex items-center justify-center rounded-2xl bg-dark-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-dark-700"
                    >
                      <FiEye size={14} />
                    </Link>
                    <Link
                      href={`/admin/products/${product._id}/edit`}
                      className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-700"
                    >
                      <FiEdit size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex items-center justify-center rounded-2xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
