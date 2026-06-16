'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { whyChooseUsApi } from '@/services/api';

export default function NewWhyChooseUs() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    sectionTitle: '',
    heading: '',
    description: '',

    leftFeatures: '',
    rightFeatures: '',

    stat1Value: '',
    stat1Label: '',

    stat2Value: '',
    stat2Label: '',

    stat3Value: '',
    stat3Label: '',

    stat4Value: '',
    stat4Label: '',
  });

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
      await whyChooseUsApi.create({
        sectionTitle: formData.sectionTitle,
        heading: formData.heading,
        description: formData.description,

        leftFeatures: formData.leftFeatures
          .split('\n')
          .filter(Boolean),

        rightFeatures: formData.rightFeatures
          .split('\n')
          .filter(Boolean),

        stats: [
          {
            value: formData.stat1Value,
            label: formData.stat1Label,
          },
          {
            value: formData.stat2Value,
            label: formData.stat2Label,
          },
          {
            value: formData.stat3Value,
            label: formData.stat3Label,
          },
          {
            value: formData.stat4Value,
            label: formData.stat4Label,
          },
        ],
      });

      toast.success('Content Saved Successfully');

      router.push('/admin/why-choose-us');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save content');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">
          Add Why Choose Us Content
        </h1>

        <p className="text-dark-600 mt-2">
          Manage website Why Choose Us section.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-sm border border-dark-100 p-6 space-y-6"
      >
        {/* Section Title */}
        <div>
          <label className="block font-semibold mb-2">
            Section Title
          </label>

          <input
            type="text"
            name="sectionTitle"
            placeholder="WHY CHOOSE SISHAR"
            value={formData.sectionTitle}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Heading */}
        <div>
          <label className="block font-semibold mb-2">
            Main Heading
          </label>

          <input
            type="text"
            name="heading"
            placeholder="Your Trusted Global Trading Partner"
            value={formData.heading}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            placeholder="Section description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold mb-2">
              Left Features
            </label>

            <textarea
              rows={8}
              name="leftFeatures"
              placeholder={`Export Quality Products
Global Shipping Solutions
Quality Inspection`}
              value={formData.leftFeatures}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Right Features
            </label>

            <textarea
              rows={8}
              name="rightFeatures"
              placeholder={`Trusted Supplier Network
Competitive Pricing
Customer-Centric Service`}
              value={formData.rightFeatures}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>
        </div>

        {/* Statistics */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Statistics
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="stat1Value"
              placeholder="50+"
              value={formData.stat1Value}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="stat1Label"
              placeholder="Countries Served"
              value={formData.stat1Label}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="stat2Value"
              placeholder="100+"
              value={formData.stat2Value}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="stat2Label"
              placeholder="Global Clients"
              value={formData.stat2Label}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="stat3Value"
              placeholder="500+"
              value={formData.stat3Value}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="stat3Label"
              placeholder="Shipments"
              value={formData.stat3Label}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="stat4Value"
              placeholder="99%"
              value={formData.stat4Value}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="stat4Label"
              placeholder="Client Satisfaction"
              value={formData.stat4Label}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
        >
          Save Content
        </button>
      </form>
    </div>
  );
}