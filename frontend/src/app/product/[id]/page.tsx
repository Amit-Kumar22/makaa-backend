'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import { productApi } from '@/services/api';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productApi.getById(id);
      setProduct(response.data);
      const allResponse = await productApi.getAll();
      setRelated(
        allResponse.data
          .filter((item: Product) => item._id !== id && item.category === response.data.category)
          .slice(0, 3)
      );
    } catch (error) {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] p-8 text-center text-dark-600">Loading product details...</div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] p-8 text-center text-dark-600">
        <p>Product not found.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-white transition hover:bg-primary-700"
        >
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-size="28" font-family="Arial,sans-serif">No image available</text></svg>';
  const getCacheSafeImage = (image: string | undefined, updatedAt?: string) => {
    if (!image) return undefined;
    const token = updatedAt ? new Date(updatedAt).getTime() : Date.now();
    return image.includes('?') ? `${image}&v=${token}` : `${image}?v=${token}`;
  };
  const imageUrl = getCacheSafeImage(product?.image, product?.updatedAt);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary-600">Product Details</p>
            <h1 className="mt-3 text-3xl font-bold text-dark-900">{product.name}</h1>
            <p className="mt-2 text-sm text-dark-600 max-w-3xl">{product.shortDescription}</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-dark-200 bg-dark-50 px-5 py-3 text-sm font-medium text-dark-900 transition hover:border-primary-600 hover:text-primary-700"
          >
            <FiChevronRight className="rotate-180" /> Back to Home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="rounded-lg border border-dark-100 bg-dark-50 p-4 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg overflow-hidden bg-white shadow-lg">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = fallbackImage;
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-dark-100 flex items-center justify-center text-3xl">
                      🌾
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="rounded-lg border border-dark-200 bg-white p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-dark-900">Price Information</h2>
                    <div className="mt-4 space-y-3 text-sm text-dark-700">
                      <div className="flex items-center justify-between border-b border-dark-100 pb-3">
                        <span>Regular Price</span>
                        <span className="font-semibold text-dark-900">{product.price ? `₹${product.price}` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <span>Discount Price</span>
                        <span className="font-semibold text-primary-600">{product.discountPrice ? `₹${product.discountPrice}` : 'Not offered'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dark-200 bg-white p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-dark-900">Product Info</h2>
                    <div className="mt-4 space-y-3 text-sm text-dark-700">
                      <div className="flex justify-between">
                        <span>Category</span>
                        <span className="font-semibold text-dark-900">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status</span>
                        <span className={`font-semibold ${product.isActive ? 'text-emerald-600' : 'text-red-600'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-lg border border-dark-100 bg-dark-50 p-4 shadow-sm">
              <div>
                <h2 className="text-xl font-semibold text-dark-900">About this product</h2>
                <p className="mt-3 text-dark-700 leading-6">{product.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-dark-900">Key Features</h3>
                {product.features && product.features.length > 0 ? (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="rounded-lg border border-dark-200 bg-white px-4 py-3 text-dark-700 shadow-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-dark-600">No additional features have been listed for this product yet.</p>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-dark-100 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-dark-900">Quick Facts</h2>
              <div className="mt-4 space-y-3 text-sm text-dark-700">
                {product.grade && (
                  <div className="flex justify-between">
                    <span>Grade</span>
                    <span className="font-semibold text-dark-900">{product.grade}</span>
                  </div>
                )}
                {product.moisture !== undefined && (
                  <div className="flex justify-between">
                    <span>Moisture</span>
                    <span className="font-semibold text-dark-900">{product.moisture}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Added</span>
                  <span className="font-semibold text-dark-900">{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-dark-100 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-dark-900">Related Products</h2>
              <div className="mt-6 space-y-4">
                {related.length > 0 ? (
                  related.map((item) => (
                    <Link key={item._id} href={`/product/${item._id}`} className="block rounded-lg border border-dark-200 bg-dark-50 p-3 transition hover:border-primary-400 hover:bg-white">
                      <h3 className="font-semibold text-dark-900">{item.name}</h3>
                      <p className="mt-2 text-sm text-dark-600 line-clamp-2">{item.shortDescription}</p>
                    </Link>
                  ))
                ) : (
                  <p className="text-dark-600">No related products available.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
