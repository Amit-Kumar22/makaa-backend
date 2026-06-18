"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";

import { FaPinterest } from "react-icons/fa";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const PRODUCT_LINKS = [
  { label: "Feed Maize", href: "#products" },
  { label: "Food Grade Maize", href: "#products" },
  { label: "Industrial Grade", href: "#products" },
  { label: "Premium Selection", href: "#products" },
  { label: "Export Grade", href: "#products" },
];

const SOCIAL = [
  {
    icon: FiFacebook,
    href: "https://www.facebook.com/Sisharglobalpvtltd-101415602008680",
    label: "Facebook",
  },
  {
    icon: FiInstagram,
    href: "https://www.instagram.com/sisharglobal?igsh=MTV3Z2FucnB0YWZ1",
    label: "Instagram",
  },
  { icon: FiTwitter, href: "https://twitter.com/LtdSishar", label: "Twitter" },
  {
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/shahid-habib-0a7a94207/",
    label: "LinkedIn",
  },
  {
    icon: FaPinterest,
    href: "https://www.pinterest.com/0e2kujohperldf0hxthpsistg91yp8/_saved/",
    label: "Pinterest",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Makka — Premium Maize Supplier"
                width={250}
                height={100}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>

            {/* Company name + description */}
            <div>
              <p className="text-sm leading-relaxed text-dark-300">
                Premium quality maize supplier for feed, food processing &amp;
                industrial applications. Trusted by exporters worldwide.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-700 text-dark-400 transition hover:border-primary-500 hover:bg-primary-600 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-dark-400 transition hover:text-primary-400 hover:pl-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Our Products
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-dark-400 transition hover:text-primary-400 hover:pl-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+91 9818205383"
                  className="flex items-start gap-3 text-dark-400 transition hover:text-primary-400"
                >
                  <FiPhone
                    size={16}
                    className="mt-0.5 shrink-0 text-primary-500"
                  />
                  <span className="text-sm">+91 9818205383</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sisharglobal.com"
                  className="flex items-start gap-3 text-dark-400 transition hover:text-primary-400"
                >
                  <FiMail
                    size={16}
                    className="mt-0.5 shrink-0 text-primary-500"
                  />
                  <span className="text-sm">info@sisharglobal.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-dark-400">
                <FiMapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-primary-500"
                />
                <span className="text-sm leading-relaxed">
                  Farm Road, Agriculture City,
                  <br />
                  India
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom bar ────────────────────────────────── */}
        <div className="border-t border-dark-800 py-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            {/* Logo mark */}
            <Link href="/" className="opacity-70 hover:opacity-100 transition">
              <Image
                src="/logo.png"
                alt="Makka"
                width={100}
                height={36}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </Link>

            {/* Copyright */}
            <p className="text-center text-xs text-dark-500">
              © {year} Copyright: © SISHAR Global Pvt. Ltd. All Rights Reserved.
            </p>

            {/* Policy links */}
            <div className="flex gap-4 text-xs text-dark-500">
              <a href="#" className="hover:text-dark-300 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-dark-300 transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
