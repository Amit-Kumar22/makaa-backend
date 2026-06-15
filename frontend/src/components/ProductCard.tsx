'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import Modal from './Modal';

const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-size="28" font-family="Arial,sans-serif">No image available</text></svg>';

interface ProductCardProps {
  product: Product;
}

const getCacheSafeImage = (
  image: string | undefined,
  updatedAt?: string
) => {
  const cleanImage = image?.trim();
  if (!cleanImage) return undefined;

  const token = updatedAt
    ? new Date(updatedAt).getTime()
    : Date.now();

  return cleanImage.includes("?")
    ? `${cleanImage}&v=${token}`
    : `${cleanImage}?v=${token}`;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);

  const imageUrl = getCacheSafeImage(product.image, product.updatedAt);

  return (
    <>
      <motion.div
        whileHover={{ y: -3 }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col"
      >
        <div className="relative h-40 sm:h-32 md:h-36 bg-dark-200 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              loading="lazy"
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition duration-300"
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-accent-100">
              <span className="text-3xl">🌾</span>
            </div>
          )}

          {product.category && (
            <div className="absolute top-3 left-3 rounded-full bg-primary-900/90 px-3 py-1 text-xs font-semibold text-accent-300">
              {product.category}
            </div>
          )}
        </div>


        <div className="p-3 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-3 mb-2">
           <h3 className="text-base sm:text-lg font-bold text-dark-900 line-clamp-2 min-h-[48px] sm:min-h-[56px]">
            {product.name}
           </h3>
            {product.category && (
              <span className="rounded-full bg-primary-100 px-2 py-1 text-[11px] font-semibold text-primary-700">
                {product.category}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-dark-600 line-clamp-3 min-h-[60px] sm:min-h-[72px]">
            {product.shortDescription}
          </p>

          {/* <div className="flex items-center justify-between gap-3 mb-3 text-sm">
            <span className="font-semibold text-dark-900">
              {product.price ? `₹${product.price}` : 'Contact'}
            </span>
            <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${product.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {product.isActive ? 'Active' : 'Inactive'}
            </span>
          </div> */}
          <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-3">
            <a
              href={`https://wa.me/9818205383?text=Hi, I am interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-primary-600 py-2 text-center text-xs font-semibold text-white hover:bg-primary-700 transition"
            >
              🛒 Shop Now
            </a>

            <a
              href={`mailto:info@sisharglobal.com?subject=Inquiry about ${product.name}`}
              className="flex-1 rounded-lg border border-accent-500 py-2 text-center text-xs font-semibold text-accent-600 hover:bg-accent-50 transition"
            >
              Send Inquiry
            </a>
          </div>

        </div>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-dark-900 mb-3">{product.name}</h2>

          {imageUrl ? (
            <img
              src={imageUrl}
              loading="lazy"
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
            />
          ) : (
            <div className="w-full h-40 flex items-center justify-center rounded-lg bg-dark-100 text-3xl">
              🌾
            </div>
          )}

          <p className="text-dark-700 mb-3">{product.fullDescription || product.shortDescription}</p>

          <div className="space-y-3 mb-4 bg-dark-50 p-3 rounded-lg">
            <div className="flex justify-between">
              <span className="text-dark-600">Price</span>
              <span className="font-semibold text-accent-600">
                {product.price ? `₹${product.price}` : 'N/A'}
              </span>
            </div>

            {product.discountPrice && (
              <div className="flex justify-between">
                <span className="text-dark-600">Discount</span>
                <span className="font-semibold text-accent-600">
                  ₹{product.discountPrice}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-dark-600">Price</span>
              <span className="font-semibold text-yellow-600">{product.price ? `₹${product.price}` : 'N/A'}</span>
            </div>
            {product.discountPrice && (
              <div className="flex justify-between">
                <span className="text-dark-600">Discount</span>
                <span className="font-semibold text-emerald-600">₹{product.discountPrice}</span>
              </div>
            )}
          </div>

          <a
            href={`mailto:info@makka.com?subject=Inquiry about ${product.name}`}
            className="w-full rounded-xl bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Request Quote
          </a>
        </div>
      </Modal>
    </>
  );
}
