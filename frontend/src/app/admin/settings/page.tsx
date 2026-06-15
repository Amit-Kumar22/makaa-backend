'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiSave } from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ContactFormData {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  googleMapEmbed: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export default function ContactManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    googleMapEmbed: '',
    socialMedia: {},
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin-login');
      return;
    }
    fetchContact();
  }, [router]);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contact`);
      setFormData(response.data);
    } catch (error) {
      toast.error('Failed to fetch contact information');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const platform = name.replace('social_', '');
      setFormData((prev) => ({
        ...prev,
        socialMedia: { ...prev.socialMedia, [platform]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem('adminToken');
    try {
      await axios.put(`${API_URL}/api/contact`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Contact information updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Contact Management</h1>
        <p className="text-dark-600 mt-2">Manage your contact information and social media links</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-dark-600">Loading...</p>
        </div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-dark-900 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark-900 mb-2">
              Google Map Embed Code
            </label>
            <textarea
              name="googleMapEmbed"
              value={formData.googleMapEmbed}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
              placeholder="Paste Google Map iframe embed code"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Social Media Links</h3>
            <div className="space-y-4">
              {['facebook', 'instagram', 'twitter', 'linkedin'].map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-semibold text-dark-900 mb-2 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    name={`social_${platform}`}
                    value={formData.socialMedia?.[platform as keyof typeof formData.socialMedia] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={`https://${platform}.com/makka`}
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={saving}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-dark-400 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            {saving ? 'Saving...' : (
              <>
                <FiSave /> Save Changes
              </>
            )}
          </motion.button>
        </motion.form>
      )}
    </div>
  );
}
