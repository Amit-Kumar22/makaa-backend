'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail, FiShield, FiClock } from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  productRequirement: string;
  message: string;
}

export default function EnquirySection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    productRequirement: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/enquiry`, formData);
      toast.success('Enquiry submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        productRequirement: '',
        message: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry" className="py-12 bg-gradient-to-b from-dark-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-lg border border-dark-100 bg-white p-4 shadow-2xl"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Get in Touch</p>
              <h2 className="mt-4 text-2xl font-bold text-dark-900">Request a Quote or Ask a Question</h2>
              <p className="mt-3 text-sm text-dark-600 leading-7">
                Our team is ready to help you source premium maize for feed, food processing and industrial applications. Submit your enquiry and receive a fast, personalized response.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="Your City"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-900 mb-2">Product Requirement</label>
                <select
                  name="productRequirement"
                  value={formData.productRequirement}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  <option value="">Select Product</option>
                  <option value="Feed Maize">Feed Maize</option>
                  <option value="Food Grade">Food Grade</option>
                  <option value="Industrial Grade">Industrial Grade</option>
                  <option value="Premium Selection">Premium Selection</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Tell us more about your requirements..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Submitting...' : (
                  <>
                    Send Enquiry <FiSend />
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 p-6 text-white shadow-2xl"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-white/80">Why connect with Makka?</p>
              <h3 className="mt-3 text-2xl font-bold">Fast Support, Premium Supply</h3>
            </div>
            <div className="space-y-6 text-sm leading-7">
              <div className="rounded-lg bg-white/10 p-3 shadow-inner">
                <div className="flex items-start gap-3">
                  <FiClock className="mt-1 text-white" />
                  <div>
                    <p className="font-semibold">Rapid Response</p>
                    <p className="text-white/80">We reply to enquiries within 24 hours with tailored offers.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 shadow-inner">
                <div className="flex items-start gap-3">
                  <FiShield className="mt-1 text-white" />
                  <div>
                    <p className="font-semibold">Trusted Quality</p>
                    <p className="text-white/80">Verified maize grades and quality checks for every shipment.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 shadow-inner">
                <div className="flex items-start gap-3">
                  <FiPhone className="mt-1 text-white" />
                  <div>
                    <p className="font-semibold">Expert Support</p>
                    <p className="text-white/80">Speak directly with our sourcing team and get exact product recommendations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-black/10 p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Contact</p>
              <p className="mt-4 text-lg font-semibold">+91 98765 43210</p>
              <p className="text-white/80">info@makka.com</p>
              <p className="mt-4 text-white/80">Premium maize supply for feed, food and industrial production.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
