'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Background Video */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      />


      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center pt-48">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="mb-5 inline-flex max-w-full  gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-700 sm:text-sm">
              <span>🌾</span>
              <span className="break-words">
                Connecting Indian Quality with Global Markets
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white max-w-3xl">
              {/* <span className="block">
                Agri Products Spices, Herbs and Natural Products
              </span> */}
            </h1>

            {/* Description */}
           <p className="mb-8 max-w-2xl mx-auto text-base text-white/90 sm:text-lg">
              Delivering premium-quality agricultural products to global
              markets with reliability, consistency and international
              standards.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row justify-center">
              <Link
                href="#products"
                className="w-full rounded-full bg-primary-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-primary-700 sm:w-auto"
              >
                ✓ Explore Products
              </Link>

              <Link
                href="#enquiry"
                className="w-full rounded-full border-2 border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-black sm:w-auto"
              >
                💬 Get Quote
              </Link>

              <Link
                href="#contact"
                className="w-full rounded-full border-2 border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-black sm:w-auto"
              >
                📞 Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}