'use client';

import { FiCheckCircle } from 'react-icons/fi';

export default function CertificationSection() {
  const certifications = [
    'IEC',
    'GST',
    'APEDA',
    'FSSAI',
    'MSME',
    'Export Certified',
  ];

  return (
    <section
      id="certifications"
      className="py-6 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

          <div className="flex flex-col lg:flex-row lg:items-center gap-4">

            <div className="lg:min-w-[250px]">
              <span className="text-green-600 text-xs font-semibold uppercase tracking-[3px]">
                Certifications
              </span>

              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Certified & Trusted Export Partner
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">

              {certifications.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm shadow-sm"
                >
                  <FiCheckCircle className="text-green-600" />
                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}