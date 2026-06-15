'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX } from 'react-icons/fi';

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setHasShown(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const defaultMessage =
    'Hello, I am interested in your products. Please share pricing and availability.';

  const encodedMessage = encodeURIComponent(defaultMessage);

  const whatsappLink = `https://wa.me/${whatsappNumber?.replace(
    /\D/g,
    ''
  )}?text=${encodedMessage}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-dark-900 hover:bg-dark-800 text-white p-4 rounded-full border-2 border-accent-500 shadow-xl z-40 transition-all duration-300"
      >
        <FiMessageCircle size={24} />
      </motion.a>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 bg-white rounded-2xl border border-slate-200 shadow-2xl z-40 max-w-sm overflow-hidden"
          >
            {/* Top Accent Bar */}
            <div className="h-1 bg-accent-500" />

            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-dark-900">
                  👋 Welcome!
                </h3>

                <button
                  onClick={() => setShowPopup(false)}
                  className="text-accent-600 hover:text-accent-700 transition"
                >
                  <FiX size={20} />
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-6 mb-4">
                Need information about our export products?
                Chat with us directly on WhatsApp for pricing,
                availability and export inquiries.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-dark-900 hover:bg-dark-800 text-white text-center font-semibold py-3 rounded-xl border border-accent-500 transition-all duration-300"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}