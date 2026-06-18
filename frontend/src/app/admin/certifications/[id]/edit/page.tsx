'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CertificationForm from '@/components/admin/CertificationForm';
import { certificationApi } from '@/services/api';
import { Certification } from '@/types';

export default function EditCertificationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [certification, setCertification] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/login');
      return;
    }
    if (id) {
      fetchCertification();
    }
  }, [id, router]);

  const fetchCertification = async () => {
    try {
      const response = await certificationApi.getById(id);
      setCertification(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load certification');
      router.push('/admin/certifications');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-dark-600">Loading certification details...</div>
    );
  }

  if (!certification) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-dark-900">Edit Certification</h1>
        <p className="mt-2 text-dark-600">Update certification details, image, and display settings.</p>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <CertificationForm certification={certification} mode="edit" onComplete={() => {}} />
      </div>
    </div>
  );
}
