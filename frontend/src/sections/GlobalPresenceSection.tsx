'use client';

import { FiMapPin } from 'react-icons/fi';

export default function GlobalPresenceSection() {
  const countries = [
    'India',
    'Turkey',
    'UAE',
    'Saudi Arabia',
    'Qatar',
    'Oman',
    'Kuwait',
    'Europe',
    'Africa',
  ];

  return (
    <section id="global-presence" className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-primary-600 rounded-3xl shadow-xl overflow-hidden">

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] items-center gap-6">

            {/* Left Content */}
            <div className="p-6 md:p-8">

              <span className="uppercase tracking-[4px] text-accent-400 text-xs font-semibold">
                Global Presence
              </span>

              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                Serving International Markets
              </h2>

              <p className="mt-3 text-slate-200 max-w-2xl text-sm md:text-base leading-relaxed">
                Delivering quality Indian products across major global
                destinations through a reliable export network.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {countries.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-sm"
                  >
                    <FiMapPin size={12} className="text-accent-400" />
                    {country}
                  </div>
                ))}
              </div>

            </div>

            {/* Right Map */}
            <div className="hidden lg:flex justify-center items-center p-4">

              <div className="bg-white rounded-2xl p-3 shadow-lg">
                <img
                  src="/world-map.png"
                  alt="Global Presence"
                  className="w-full max-w-[320px] object-contain"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}