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
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Why Choose Us', href: '#why' },
    { label: 'Enquiry', href: '#enquiry' },
    { label: 'Contact', href: '#contact' },
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
                width={350}
                height={150}
                className="h-14 w-auto object-contain"

              />
            </Link>
          </div>

          {/* Menu Center */}
          <div className="hidden md:flex justify-center items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium whitespace-nowrap"
              >
                {item.label}
              </Link>
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
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white shadow-lg relative z-[9999]"
        >
          <div className="flex flex-col px-4 py-4 gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block w-full py-2 text-lg font-medium text-dark-900 hover:text-primary-600 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
