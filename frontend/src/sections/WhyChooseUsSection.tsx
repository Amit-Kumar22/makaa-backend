'use client';

import { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { whyChooseUsApi } from '@/services/api';
import { WhyChooseUsItem } from '@/types';

// Fallback shown when API has no data yet
const FALLBACK_ITEMS = [
  'Export Quality Products',
  'Trusted Supplier Network',
  'Global Shipping Solutions',
  'Competitive Pricing',
  'Quality Inspection',
  'Customer-Centric Service',
  'Multilingual Support',
  'End-to-End Documentation Assistance',
];

function ItemIcon({ imageUrl, title }: { imageUrl?: string; title: string }) {
  const [failed, setFailed] = useState(false);
  if (imageUrl && !failed) {
    return (
      <img
        src={imageUrl}
        alt={title}
        className="h-5 w-5 shrink-0 object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <FiCheckCircle size={18} className="text-accent-600 flex-shrink-0" />;
}

export default function WhyChooseUsSection() {
  const [items, setItems] = useState<WhyChooseUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    whyChooseUsApi
      .getAll()
      .then((res) => setItems(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const useFallback = error || (!loading && items.length === 0);

  // ── Loading skeleton — same grid shape as final content ──────────────
  const Skeleton = () => (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-[18px] w-[18px] shrink-0 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );

  return (
    <section id="why" className="py-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">

          {/* ── Header (static — design must not change) ── */}
          <div className="text-center mb-6">
            <span className="text-yellow-600 font-semibold uppercase tracking-widest">
              WHY CHOOSE SISHAR
            </span>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              Your Trusted Global Trading Partner
            </h2>
            <p className="max-w-3xl mx-auto mt-5 text-slate-600">
              Delivering quality products, reliable sourcing, competitive pricing and seamless
              international trade solutions for businesses worldwide.
            </p>
          </div>

          {/* ── Items grid — dynamic ── */}
          {loading ? (
            <Skeleton />
          ) : useFallback ? (
            /* Fallback: exact same markup as original */
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
              {FALLBACK_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FiCheckCircle size={18} className="text-accent-600 flex-shrink-0" />
                  <span className="text-sm md:text-base text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <ItemIcon imageUrl={item.imageUrl} title={item.title} />
                  <span className="text-sm md:text-base text-slate-700">{item.title}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Stats (static — design must not change) ── */}
          <div className="border-t border-slate-200 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-accent-600">50+</h3>
                <p className="text-slate-600 text-sm mt-1">Countries Served</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-accent-600">100+</h3>
                <p className="text-slate-600 text-sm mt-1">Global Clients</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-accent-600">500+</h3>
                <p className="text-slate-600 text-sm mt-1">Shipments</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-accent-600">99%</h3>
                <p className="text-slate-600 text-sm mt-1">Client Satisfaction</p>
              </div>
              <div className="border-t pt-4 text-center text-sm text-slate-600 col-span-2 md:col-span-4">
                Serving clients across 50+ countries with trusted export solutions.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
