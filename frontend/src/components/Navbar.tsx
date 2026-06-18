'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiChevronDown } from 'react-icons/fi';
import { useUserStore } from '@/store/userStore';
import LoginModal from './LoginModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginDefaultTab, setLoginDefaultTab] = useState<'login' | 'register'>('login');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, user, logout, hydrate } = useUserStore();

  // Rehydrate user auth from localStorage on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Why Choose Us', href: '#why' },
    { label: 'Enquiry', href: '#enquiry' },
    { label: 'Contact', href: '#contact' },
  ];

  const openLogin = () => { setLoginDefaultTab('login'); setShowLoginModal(true); };
  const openRegister = () => { setLoginDefaultTab('register'); setShowLoginModal(true); };
  const handleLogout = () => { logout(); setShowUserDropdown(false); };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="SISHAR Global"
                width={600}
                height={300}
                className="h-12 w-auto object-contain md:h-[52px]"
                priority
              />
            </Link>

            {/* Desktop nav items */}
            <div className="hidden md:flex items-center gap-5 xl:gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-dark-700 hover:text-primary-600 transition whitespace-nowrap cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {isLoggedIn && user ? (
                /* ── Logged-in user dropdown ── */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowUserDropdown((p) => !p)}
                    className="flex items-center gap-2 rounded-xl border border-dark-200 bg-white px-3 py-2 text-sm font-medium text-dark-800 transition hover:border-primary-300 hover:bg-primary-50"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white uppercase shrink-0">
                      {user.name.charAt(0)}
                    </span>
                    <span className="max-w-[120px] truncate">{user.name}</span>
                    <FiChevronDown
                      size={14}
                      className={`transition-transform ${showUserDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-dark-100 bg-white py-2 shadow-xl"
                      >
                        <div className="border-b border-dark-100 px-4 pb-2 mb-1">
                          <p className="text-xs font-semibold text-dark-900 truncate">{user.name}</p>
                          <p className="text-xs text-dark-500 truncate">{user.email}</p>
                        </div>
                        <DropdownItem icon={<FiUser size={14} />} label="My Account" href="/account" onClick={() => setShowUserDropdown(false)} />
                        <DropdownItem icon={<FiSettings size={14} />} label="Settings" href="/account/settings" onClick={() => setShowUserDropdown(false)} />
                        <div className="mt-1 border-t border-dark-100 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <FiLogOut size={14} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* ── Guest auth buttons ── */
                <>
                  <button
                    onClick={openLogin}
                    className="rounded-xl border border-dark-200 px-4 py-2 text-sm font-medium text-dark-700 transition hover:border-primary-300 hover:text-primary-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={openRegister}
                    className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl text-primary-600"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white shadow-lg border-t border-dark-100"
            >
              <div className="flex flex-col px-4 py-4 gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block py-2.5 text-base font-medium text-dark-800 hover:text-primary-600 transition"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                ))}

                <div className="mt-3 border-t border-dark-100 pt-3 space-y-2">
                  {isLoggedIn && user ? (
                    <>
                      <div className="flex items-center gap-2 px-1 py-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white uppercase">
                          {user.name.charAt(0)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-dark-900">{user.name}</p>
                          <p className="text-xs text-dark-500">{user.email}</p>
                        </div>
                      </div>
                      <Link href="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2 text-sm text-dark-700 hover:text-primary-600">
                        <FiUser size={14} /> My Account
                      </Link>
                      <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex w-full items-center gap-2 py-2 text-sm text-red-600">
                        <FiLogOut size={14} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { openLogin(); setIsOpen(false); }} className="w-full rounded-xl border border-dark-200 py-2.5 text-sm font-medium text-dark-700">
                        Login
                      </button>
                      <button onClick={() => { openRegister(); setIsOpen(false); }} className="w-full rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white">
                        Register
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login/Register Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        defaultTab={loginDefaultTab}
      />
    </>
  );
}

function DropdownItem({
  icon, label, href, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-dark-700 hover:bg-dark-50 hover:text-primary-600 transition"
    >
      {icon} {label}
    </Link>
  );
}
