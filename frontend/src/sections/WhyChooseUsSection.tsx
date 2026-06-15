'use client';

import { FiCheckCircle } from 'react-icons/fi';

export default function WhyChooseUsSection() {
  const reasons = [
    'Export Quality Products',
    'Trusted Supplier Network',
    'Global Shipping Solutions',
    'Competitive Pricing',
    'Quality Inspection',
    'Customer-Centric Service',
    'Multilingual Support',
    'End-to-End Documentation Assistance',
  ];

  return (
    <section
      id="why"
      className="py-8 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">

          <div className="text-center mb-6">
            <span className="text-yellow-600 font-semibold uppercase tracking-widest">
              WHY CHOOSE SISHAR
            </span>

            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              Your Trusted Global Trading Partner
            </h2>

            <p className="max-w-3xl mx-auto mt-5 text-slate-600">
              Delivering quality products, reliable sourcing,
              competitive pricing and seamless international
              trade solutions for businesses worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
            {reasons.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <FiCheckCircle
                  size={18}
                  className="text-accent-600 flex-shrink-0"
                />

                <span className="text-sm md:text-base text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-accent-600">
                  50+
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Countries Served
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-accent-600">
                  100+
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Global Clients
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-accent-600">
                  500+
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Shipments
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-accent-600">
                  99%
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Client Satisfaction
                </p>
              </div>
              <div className="border-t pt-4 text-center text-sm text-slate-600">
                Serving clients across 50+ countries with trusted export solutions.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}