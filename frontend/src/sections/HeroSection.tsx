'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const SLIDES = ['/hero-bg.png', '/hero-bg2.png', '/hero-bg3.jpg'];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    startTimer();
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    startTimer();
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Background Carousel */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Arrow Buttons */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startTimer(); }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-5' : 'bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>


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
