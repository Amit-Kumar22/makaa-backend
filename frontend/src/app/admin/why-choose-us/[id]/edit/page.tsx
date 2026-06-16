'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { whyChooseUsApi } from '@/services/api';

export default function EditWhyChooseUs() {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    sectionTitle: '',
    heading: '',
    description: '',
    leftFeatures: '',
    rightFeatures: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await whyChooseUsApi.getById(
        params.id as string
      );

      const data = res.data;

      setFormData({
        sectionTitle: data.sectionTitle || '',
        heading: data.heading || '',
        description: data.description || '',
        leftFeatures: (data.leftFeatures || []).join('\n'),
        rightFeatures: (data.rightFeatures || []).join('\n'),
      });
    } catch {
      toast.error('Failed to load data');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await whyChooseUsApi.update(
        params.id as string,
        {
          sectionTitle: formData.sectionTitle,
          heading: formData.heading,
          description: formData.description,
          leftFeatures:
            formData.leftFeatures.split('\n'),
          rightFeatures:
            formData.rightFeatures.split('\n'),
        }
      );

      toast.success('Updated Successfully');

      router.push('/admin/why-choose-us');
    } catch {
      toast.error('Update Failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Why Choose Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <input
          type="text"
          name="sectionTitle"
          className="w-full border p-3 rounded-lg"
          value={formData.sectionTitle}
          onChange={handleChange}
        />

        <input
          type="text"
          name="heading"
          className="w-full border p-3 rounded-lg"
          value={formData.heading}
          onChange={handleChange}
        />

        <textarea
          name="description"
          rows={4}
          className="w-full border p-3 rounded-lg"
          value={formData.description}
          onChange={handleChange}
        />

        <textarea
          name="leftFeatures"
          rows={5}
          className="w-full border p-3 rounded-lg"
          value={formData.leftFeatures}
          onChange={handleChange}
        />

        <textarea
          name="rightFeatures"
          rows={5}
          className="w-full border p-3 rounded-lg"
          value={formData.rightFeatures}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-primary-600 text-white px-6 py-3 rounded-xl"
        >
          Update
        </button>
      </form>
    </div>
  );
}