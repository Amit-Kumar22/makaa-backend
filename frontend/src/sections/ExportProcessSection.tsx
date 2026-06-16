'use client';

import { motion } from 'framer-motion';

export default function ExportProcessSection() {
  const steps = [
    'Product Selection',
    'Quotation',
    'Sample Approval',
    'Contract Finalization',
    'Packaging',
    'Shipping',
    'Delivery',
    'Customer Support',
  ];

  return (
    <section
      id="export-process"
      className="py-12 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <span className="text-primary-500 font-semibold uppercase tracking-[4px] text-sm">
            Export Process
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Simple & Transparent Export Journey
          </h2>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            From product selection to final delivery, we ensure a smooth and
            reliable export experience.
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-wrap justify-center items-center gap-3">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-3 shadow-sm hover:shadow-md transition-all">

                <div className="w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
                  {step}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div className="hidden lg:flex items-center mx-2">
                  <div className="w-8 h-[2px] bg-accent-400 relative">
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] border-t-transparent border-b-transparent border-l-accent-400"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}