'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';

interface EnquirySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function EnquirySuccessModal({ isOpen, onClose, productName }: EnquirySuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl text-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-dark-100 text-dark-500 hover:bg-dark-200 transition"
              >
                <FiX size={16} />
              </button>

              <div className="flex justify-center mb-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <FiCheckCircle size={40} className="text-emerald-600" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-dark-900 mb-2">Thank You!</h2>

              <p className="text-dark-600 mb-1">
                Your enquiry has been submitted successfully.
              </p>
              {productName && (
                <p className="text-sm font-medium text-primary-600 mb-3">
                  Product: {productName}
                </p>
              )}
              <p className="text-sm text-dark-500 mb-7">
                Our team will contact you shortly with complete details and pricing.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-2xl border border-dark-200 py-3 text-sm font-semibold text-dark-700 transition hover:bg-dark-50"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919818205383'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <FiMessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
