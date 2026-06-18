'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  FiArrowLeft, FiMessageCircle, FiShoppingCart,
  FiChevronRight, FiTag, FiLayers, FiPercent,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { productApi, productEnquiryApi } from '@/services/api';
import { Product } from '@/types';
import { useUserStore } from '@/store/userStore';
import LoginModal from '@/components/LoginModal';
import EnquirySuccessModal from '@/components/EnquirySuccessModal';

const fallbackImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-size="28" font-family="Arial,sans-serif">No image available</text></svg>';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919818205383';

const getCacheSafe = (image?: string, updatedAt?: string) => {
  if (!image) return undefined;
  const t = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  return image.includes('?') ? `${image}&v=${t}` : `${image}?v=${t}`;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { isLoggedIn, hydrate } = useUserStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await productApi.getById(id);
        setProduct(res.data);
        const all = await productApi.getAll();
        setRelated(
          all.data.filter((p: Product) => p._id !== id && p.category === res.data.category).slice(0, 3)
        );
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Called when user is ALREADY logged in
  const createEnquiryDirectly = async () => {
    if (!product) return;
    try {
      setSubmitting(true);
      console.log('[ProductDetail] User already logged in. Creating enquiry for:', product.name);
      const res = await productEnquiryApi.create({
        productId: product._id,
        productName: product.name,
        productCategory: product.category,
        productPrice: product.price?.toString() || '',
      });
      console.log('[ProductDetail] Enquiry created:', res.data?._id);
      setShowSuccess(true);
    } catch (err: any) {
      console.error('[ProductDetail] Enquiry failed:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to submit enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShopNow = () => {
    if (isLoggedIn) {
      createEnquiryDirectly();
    } else {
      setShowLoginModal(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="space-y-4 w-full max-w-4xl px-8">
          <div className="h-8 w-64 animate-pulse rounded-xl bg-slate-200" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-200" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-dark-600 text-lg">Product not found.</p>
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-white hover:bg-primary-700 transition"
        >
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  const imageUrl = getCacheSafe(product.image, product.updatedAt);
  const whatsappMsg = encodeURIComponent(
    `Hello Team,\n\nI am interested in the following product:\n\nProduct Name: ${product.name}\n\nPlease share complete details.\n\nThank You.`
  );

  return (
    <>
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-dark-500">
            <Link href="/" className="hover:text-primary-600 transition">Home</Link>
            <FiChevronRight size={13} />
            <Link href="/#products" className="hover:text-primary-600 transition">Products</Link>
            <FiChevronRight size={13} />
            <span className="text-dark-900 font-medium line-clamp-1">{product.name}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* ── Left ── */}
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-[1fr_280px]">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden border border-dark-100 bg-dark-50 aspect-[4/3]">
                  {imageUrl ? (
                    <img src={imageUrl} alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = fallbackImage; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">🌾</div>
                  )}
                </div>

                {/* Pricing + quick facts */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-dark-100 bg-white p-5 shadow-sm">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-3">Pricing</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-dark-600"><FiTag size={13} /> Regular Price</span>
                        <span className="font-bold text-dark-900">{product.price ? `₹${product.price}` : 'On Request'}</span>
                      </div>
                      {product.discountPrice && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-dark-600"><FiPercent size={13} /> Discount Price</span>
                          <span className="font-bold text-primary-600">₹{product.discountPrice}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-dark-100 bg-white p-5 shadow-sm">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-3">Quick Facts</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-dark-600"><FiLayers size={13} /> Category</span>
                        <span className="font-semibold text-dark-900">{product.category}</span>
                      </div>
                      {product.grade && (
                        <div className="flex items-center justify-between">
                          <span className="text-dark-600">Grade</span>
                          <span className="font-semibold text-dark-900">{product.grade}</span>
                        </div>
                      )}
                      {product.moisture !== undefined && (
                        <div className="flex items-center justify-between">
                          <span className="text-dark-600">Moisture</span>
                          <span className="font-semibold text-dark-900">{product.moisture}%</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-dark-600">Status</span>
                        <span className={`font-semibold ${product.isActive ? 'text-emerald-600' : 'text-red-600'}`}>
                          {product.isActive ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-dark-100 bg-dark-50 p-5">
                <h2 className="text-xl font-semibold text-dark-900 mb-3">About this Product</h2>
                <p className="text-dark-700 leading-relaxed">{product.fullDescription}</p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="rounded-2xl border border-dark-100 bg-dark-50 p-5">
                  <h2 className="text-xl font-semibold text-dark-900 mb-4">Key Features</h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm text-dark-700 shadow-sm">
                        <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-dark-100 bg-white p-5 shadow-sm">
                {product.category && (
                  <span className="mb-2 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                    {product.category}
                  </span>
                )}
                <h1 className="text-2xl font-bold text-dark-900 mb-2">{product.name}</h1>
                <p className="text-sm text-dark-600">{product.shortDescription}</p>
              </div>

              {/* Action buttons */}
              <div className="rounded-2xl border border-dark-100 bg-white p-5 shadow-sm space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-emerald-500 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition"
                >
                  <FiMessageCircle size={16} /> Enquiry Now (WhatsApp)
                </a>
                <button
                  onClick={handleShopNow} disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60 transition"
                >
                  <FiShoppingCart size={16} />
                  {submitting ? 'Submitting…' : 'Shop Now'}
                </button>
                <p className="text-center text-xs text-dark-400">
                  {isLoggedIn ? 'Click Shop Now to submit your enquiry' : 'Login required to submit a Shop Now enquiry'}
                </p>
              </div>

              {/* Related products */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-dark-100 bg-white p-5 shadow-sm">
                  <h2 className="text-base font-semibold text-dark-900 mb-3">Related Products</h2>
                  <div className="space-y-3">
                    {related.map((item) => (
                      <Link key={item._id} href={`/product/${item._id}`}
                        className="flex gap-3 rounded-xl border border-dark-100 p-3 transition hover:border-primary-300 hover:bg-primary-50"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-dark-100">
                          {item.image ? (
                            <img src={getCacheSafe(item.image, item.updatedAt)} alt={item.name}
                              className="h-full w-full object-cover"
                              onError={(e) => { e.currentTarget.src = fallbackImage; }} />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-lg">🌾</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-dark-900 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-dark-500 line-clamp-2">{item.shortDescription}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link href="/#products"
                className="flex items-center justify-center gap-2 rounded-2xl border border-dark-200 py-3 text-sm font-medium text-dark-700 hover:border-primary-300 hover:text-primary-600 transition"
              >
                <FiArrowLeft size={14} /> Back to Products
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/*
        LoginModal receives the product. After auth it calls createWithToken()
        using the fresh JWT — no setTimeout, no race condition.
      */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        defaultTab="register"
        pendingProduct={{
          _id: product._id,
          name: product.name,
          category: product.category,
          price: product.price,
        }}
        onAuthSuccess={(_user, enquiryCreated) => {
          if (enquiryCreated) setShowSuccess(true);
        }}
      />

      <EnquirySuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        productName={product.name}
      />
    </>
  );
}
