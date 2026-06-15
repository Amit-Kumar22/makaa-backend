'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-primary-400 mb-3">🌾 Makka</h3>
            <p className="text-dark-300">
              Premium Quality Maize Supplier for Feed, Food Processing & Industrial
              Applications.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-dark-300">
              <li>
                <Link href="#home" className="hover:text-primary-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-primary-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-primary-400 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#enquiry" className="hover:text-primary-400 transition">
                  Enquiry
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-sm mb-3">Products</h4>
            <ul className="space-y-2 text-dark-300">
              <li>
                <Link href="#products" className="hover:text-primary-400 transition">
                  Feed Maize
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-primary-400 transition">
                  Food Grade
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-primary-400 transition">
                  Industrial Grade
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-primary-400 transition">
                  Premium Selection
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <div className="space-y-3 text-dark-300">
              <div className="flex items-center gap-2">
                <FiPhone className="text-primary-400" />
                <a href="tel:+919876543210" className="hover:text-primary-400 transition">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-primary-400" />
                <a
                  href="mailto:info@makka.com"
                  className="hover:text-primary-400 transition"
                >
                  info@makka.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <FiMapPin className="text-primary-400 mt-1" />
                <p>Farm Road, Agriculture City, India</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 py-4 border-y border-dark-700">
          <a href="#" className="text-dark-400 hover:text-primary-400 transition">
            <FiFacebook size={24} />
          </a>
          <a href="#" className="text-dark-400 hover:text-primary-400 transition">
            <FiInstagram size={24} />
          </a>
          <a href="#" className="text-dark-400 hover:text-primary-400 transition">
            <FiTwitter size={24} />
          </a>
          <a href="#" className="text-dark-400 hover:text-primary-400 transition">
            <FiLinkedin size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-dark-400 text-sm mt-4">
          <p>
            © {currentYear} Makka Premium Maize. All rights reserved. | Privacy Policy
            | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
