'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiDollarSign,
  FiHeadphones,
  FiSend,
  FiChevronRight,
} from 'react-icons/fi';
import { Contact } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contact`);
      setContact(response.data);
    } catch (error) {
      console.error('Failed to fetch contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error('Please fill all fields before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/enquiry`, {
        ...formData,
        productRequirement: formData.subject,
      });
      toast.success('Inquiry sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  const formatNumber = (value?: string) => value?.replace(/[^0-9+]/g, '') ?? '';
  const whatsappLink = contact?.whatsapp ? `https://wa.me/${formatNumber(contact.whatsapp)}` : `https://wa.me/${formatNumber(contact?.phone)}`;

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-12 bg-gradient-to-b from-dark-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-primary-600 font-semibold">Let’s Connect</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-dark-900">Contact Us</h2>
          <p className="mt-2 text-sm md:text-base text-dark-600 max-w-2xl mx-auto">
            Get in touch with us for any inquiries, orders, or business partnerships.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 mb-8">

          {/* Phone */}
          {/* Phone + Language */}
          <div className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shrink-0">
              <FiPhone size={24} />
            </div>

            <div className="w-full">
              <h4 className="font-semibold text-dark-900 text-lg">Phone</h4>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1">
                <p className="text-dark-600 font-medium">
                  {contact?.phone || '+91 98765 43210'}
                </p>

                <select
                  className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-dark-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  defaultValue="en"
                >
                  <option value="en">🇺🇸 English</option>
                  <option value="hi">🇮🇳 Hindi</option>
                  <option value="gu">🇮🇳 Gujarati</option>
                  <option value="mr">🇮🇳 Marathi</option>
                  <option value="ta">🇮🇳 Tamil</option>
                  <option value="te">🇮🇳 Telugu</option>
                  <option value="bn">🇮🇳 Bengali</option>
                  <option value="pa">🇮🇳 Punjabi</option>
                  <option value="ur">🇮🇳 Urdu</option>
                </select>
              </div>

              <p className="text-xs text-dark-500 mt-2">
                Mon - Fri, 9 AM - 6 PM
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shrink-0">
              <FiMail size={24} />
            </div>

            <div>
              <h4 className="font-semibold text-dark-900 text-lg">Email</h4>
              <p className="text-dark-600">{contact?.email || 'info@makka.com'}</p>
              <p className="text-xs text-dark-500 mt-1">Response within 24 hours</p>
            </div>
          </div>

          {/* Address */}
          <div className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shrink-0">
              <FiMapPin size={24} />
            </div>

            <div>
              <h4 className="font-semibold text-dark-900 text-lg">Address</h4>
              <p className="text-dark-600">
                {contact?.address || 'Farm Road, Agriculture City, Madhya Pradesh, India'}
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shrink-0">
              <FiClock size={24} />
            </div>

            <div>
              <h4 className="font-semibold text-dark-900 text-lg">Business Hours</h4>
              <p className="text-dark-600">Monday - Friday</p>
              <p className="text-xs text-dark-500 mt-1">9:00 AM - 6:00 PM</p>
            </div>
          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-start mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl border border-dark-100 bg-white p-4 lg:p-6 shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-primary-600 font-semibold mb-3">We’re Here to Help You</p>
            <h3 className="text-2xl font-bold text-dark-900 mb-3">Questions about our products or services?</h3>
            <p className="text-sm text-dark-600 leading-6 mb-6">
              Our team is ready to assist you with the best solutions for your business needs.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-primary-50 p-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-700 mb-2">
                  <FiCheckCircle size={16} />
                </div>
                <p className="font-semibold text-dark-900 mb-1 text-sm">Premium Quality</p>
                <p className="text-xs text-dark-600">Top quality maize products.</p>
              </div>
              <div className="rounded-lg bg-primary-50 p-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-700 mb-2">
                  <FiTruck size={16} />
                </div>
                <p className="font-semibold text-dark-900 mb-1 text-sm">Timely Delivery</p>
                <p className="text-xs text-dark-600">On-time delivery assured.</p>
              </div>
              <div className="rounded-lg bg-primary-50 p-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-700 mb-2">
                  <FiDollarSign size={16} />
                </div>
                <p className="font-semibold text-dark-900 mb-1 text-sm">Best Pricing</p>
                <p className="text-xs text-dark-600">Competitive market prices.</p>
              </div>
              <div className="rounded-lg bg-primary-50 p-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-700 mb-2">
                  <FiHeadphones size={16} />
                </div>
                <p className="font-semibold text-dark-900 mb-1 text-sm">Customer Support</p>
                <p className="text-xs text-dark-600">24/7 customer assistance.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg h-full"
          >
            <div className="relative h-full min-h-[300px]">
              <img
                src="/contact-team.jpg"
                alt="Customer Support"
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

              {/* Text Content */}
              <div className="absolute bottom-8 left-8 text-white z-10">

                <p className="text-sm uppercase tracking-widest mb-2">
                  Trusted Maize Supplier
                </p>

                <h3 className="text-3xl font-bold mb-3">
                  Delivering Quality Across India
                </h3>

                <p className="text-sm max-w-sm">
                  Premium maize products with reliable delivery,
                  competitive pricing and dedicated customer support.
                </p>

                {/* YAHAN ADD KARNA HAI */}
                <div className="flex gap-6 mt-5">
                  <div>
                    <h4 className="text-2xl font-bold">500+</h4>
                    <p className="text-xs">Happy Clients</p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold">10+</h4>
                    <p className="text-xs">Years Experience</p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold">24/7</h4>
                    <p className="text-xs">Support</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-lg border border-dark-100 bg-white p-4 lg:p-6 shadow-lg"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-dark-900 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-900 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-900 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Enter subject"
                />
              </div>
            </div>

              <div className="mt-3">
              <label className="block text-sm font-semibold text-dark-900 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-lg border border-dark-200 bg-dark-50 px-3 py-2 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Send Inquiry'}
              <FiSend size={18} />
            </button>
          </motion.form> */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden shadow-lg mb-6"
        >
          {contact?.googleMapEmbed ? (
            <div
              className="w-full h-[220px] sm:h-[260px] lg:h-[300px]"
              dangerouslySetInnerHTML={{ __html: contact.googleMapEmbed }}
            />
          ) : (
            <div className="flex h-[220px] items-center justify-center bg-dark-100 text-dark-500">
              Map preview unavailable
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-lg border border-dark-100 bg-white px-4 py-3 shadow-lg flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-dark-900">Need immediate assistance?</p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-dark-900">
              <span>Call</span>
              <a href={`tel:${formatNumber(contact?.phone)}`} className="text-primary-600 hover:text-primary-700">
                {contact?.phone || '+91-9818205383'}
              </a>
            </div>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-100"
          >
            <FiChevronRight /> Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
