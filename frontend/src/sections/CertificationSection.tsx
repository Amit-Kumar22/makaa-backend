'use client';

import { useEffect, useState } from 'react';
import { FiCheckCircle, FiFileText } from 'react-icons/fi';
import { certificationApi } from '@/services/api';
import { Certification } from '@/types';
import CertificationModal from '@/components/CertificationModal';

const FALLBACK_CERTIFICATIONS = ['IEC', 'GST', 'APEDA', 'FSSAI', 'MSME', 'Export Certified'];

function CertBadgeIcon({ imageUrl, title }: { imageUrl?: string; title: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imageUrl && !imgFailed) {
    return (
      <img
        src={imageUrl}
        alt={title}
        className="h-5 w-5 shrink-0 object-contain"
        loading="lazy"
        onError={() => setImgFailed(true)}
      />
    );
  }
  return <FiCheckCircle className="text-green-600 shrink-0" />;
}

export default function CertificationSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    certificationApi
      .getAll()
      .then((res) => setCertifications(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleCertClick = (cert: Certification) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const useFallback = error || (!loading && certifications.length === 0);

  return (
    <>
      <section id="certifications" className="py-6 bg-white">
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
                {loading ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-slate-200" />
                    ))}
                  </>
                ) : useFallback ? (
                  FALLBACK_CERTIFICATIONS.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm shadow-sm"
                    >
                      <FiCheckCircle className="text-green-600" />
                      {name}
                    </div>
                  ))
                ) : (
                  certifications.map((cert) => (
                    <button
                      key={cert._id}
                      onClick={() => handleCertClick(cert)}
                      title={`View ${cert.title} details`}
                      className="group flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm shadow-sm cursor-pointer transition hover:border-primary-300 hover:shadow-md hover:bg-primary-50 active:scale-95"
                    >
                      <CertBadgeIcon imageUrl={cert.imageUrl} title={cert.title} />
                      <span className="group-hover:text-primary-700 transition-colors">{cert.title}</span>
                      {cert.pdfUrl && (
                        <FiFileText size={12} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                      )}
                    </button>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Certificate details modal */}
      <CertificationModal
        certification={selectedCert}
        isOpen={modalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
