'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiMessageCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Product } from '@/types';
import { useUserStore } from '@/store/userStore';
import { productEnquiryApi } from '@/services/api';
import LoginModal from './LoginModal';
import EnquirySuccessModal from './EnquirySuccessModal';

const fallbackImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-size="28" font-family="Arial,sans-serif">No image available</text></svg>';

const getCacheSafeImage = (image: string | undefined, updatedAt?: string) => {
  const clean = image?.trim();
  if (!clean) return undefined;
  const token = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  return clean.includes('?') ? `${clean}&v=${token}` : `${clean}?v=${token}`;
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919818205383';

export default function ProductCard({ product }: { product: Product }) {
  const { isLoggedIn } = useUserStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const imageUrl = getCacheSafeImage(product.image, product.updatedAt);

  // Called when user is ALREADY logged in (no modal needed)
  const createEnquiryDirectly = async () => {
    try {
      setSubmitting(true);
      console.log('[ProductCard] User already logged in. Creating enquiry for:', product.name);
      const res = await productEnquiryApi.create({
        productId: product._id,
        productName: product.name,
        productCategory: product.category,
        productPrice: product.price?.toString() || '',
      });
      console.log('[ProductCard] Enquiry created:', res.data?._id);
      setShowSuccess(true);
    } catch (err: any) {
      console.error('[ProductCard] Enquiry failed:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShopNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoggedIn) {
      createEnquiryDirectly();
    } else {
      setShowLoginModal(true);
    }
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Team,\n\nI am interested in the following product:\n\nProduct Name: ${product.name}\n\nPlease share complete details.\n\nThank You.`
  );

  return (
    <>
      <motion.div whileHover={{ y: -3 }} className="h-full">
        <Link
          href={`/product/${product._id}`}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col group"
        >
          {/* Image */}
          <div className="relative h-40 sm:h-36 bg-dark-200 overflow-hidden shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl} loading="lazy" alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => { e.currentTarget.src = fallbackImage; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-accent-100">
                <span className="text-3xl">🌾</span>
              </div>
            )}
            {product.category && (
              <div className="absolute top-2 left-2 rounded-full bg-primary-900/90 px-2.5 py-0.5 text-xs font-semibold text-accent-300">
                {product.category}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 flex flex-col flex-1">
            <h3 className="text-base font-bold text-dark-900 line-clamp-2 min-h-[48px] mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-dark-600 line-clamp-2 flex-1 mb-3">
              {product.shortDescription}
            </p>

            <div className="flex gap-2 mt-auto" onClick={(e) => e.preventDefault()}>
              {/* button instead of <a> — avoids <a> nested inside the card's <a> */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`,
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-500 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 transition"
              >
                <FiMessageCircle size={13} /> Enquiry Now
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleShopNow(e); }}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary-600 py-2 text-xs font-semibold text-white hover:bg-primary-700 disabled:opacity-60 transition"
              >
                <FiShoppingCart size={13} />
                {submitting ? '…' : 'Shop Now'}
              </button>
            </div>
          </div>
        </Link>
      </motion.div>

      {/*
        LoginModal receives the product directly.
        After auth it calls productEnquiryApi.createWithToken() using the fresh JWT —
        no setTimeout, no localStorage race condition.
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
