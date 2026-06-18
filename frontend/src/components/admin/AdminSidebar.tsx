'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiPackage,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiAward,
  FiCheckSquare,
  FiShoppingCart,
} from 'react-icons/fi';


export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
      : null;
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUser');
    }
    router.replace('/login');
  };

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FiPackage, label: 'Products', href: '/admin/products' },
    { icon: FiAward, label: 'Why Choose Us', href: '/admin/why-choose-us' },
    { icon: FiCheckSquare, label: 'Certifications', href: '/admin/certifications' },
    { icon: FiShoppingCart, label: 'Shop Enquiries', href: '/admin/product-enquiries' },
    { icon: FiMessageSquare, label: 'Contact Enquiries', href: '/admin/enquiries' },
    { icon: FiSettings, label: 'Settings', href: '/admin/settings' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : 0 }}
        className={`${isOpen ? 'fixed' : 'hidden'
          } lg:relative lg:block w-64 bg-dark-900 text-white h-screen flex flex-col z-40 transition-all duration-300 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'
          }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="text-2xl font-bold text-primary-400">
              Makka
            </Link>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(item.href)
                  ? 'bg-primary-600 text-white'
                  : 'text-dark-300 hover:bg-dark-800'
                }`}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-dark-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-dark-800 transition"
          >
            <FiLogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
