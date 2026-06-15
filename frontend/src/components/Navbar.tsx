'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };



    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navItems = [
    { label: 'Home', href: '/#home' },
    { label: 'About Us', href: '/#about' },
    { label: 'Products', href: '/#products' },
    { label: 'Why Choose Us', href: '/#why' },
    { label: 'Enquiry', href: '/#enquiry' },
    { label: 'Contact', href: '/#contact' },
    //  { label: "Our Team", href: "/#team" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white shadow-md'
        : 'bg-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-12">

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SISHAR Global"
                width={250}
                height={100}
                className="h-14 w-auto object-contain"
                
              />
            </Link>
          </div>

          {/* Menu Center */}
          <div className="hidden md:flex justify-center items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-medium whitespace-nowrap transition-colors ..."
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Login Right */}
          <div className="hidden md:flex justify-end">
            <Link
              href="/admin-login"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Login
            </Link>
          </div>

          <div className="flex justify-end md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-primary-600"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-dark-900 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin-login"
              className="block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-center transition"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
