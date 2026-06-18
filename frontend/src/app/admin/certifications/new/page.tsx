'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CertificationForm from '@/components/admin/CertificationForm';

export default function NewCertificationPage() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-dark-900">Add New Certification</h1>
        <p className="mt-2 text-dark-600">
          Create a new certification entry with image and display settings.
        </p>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <CertificationForm mode="create" onComplete={() => {}} />
      </div>
    </div>
  );
}
