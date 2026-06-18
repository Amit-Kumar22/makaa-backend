'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiX, FiUser, FiMail, FiLock, FiPhone,
  FiMapPin, FiBriefcase, FiEye, FiEyeOff,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { userApi, productEnquiryApi } from '@/services/api';
import { useUserStore } from '@/store/userStore';
import { User } from '@/types';

// Product data passed from the Shop Now button
export interface PendingProduct {
  _id: string;
  name: string;
  category: string;
  price?: number | null;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Fired after auth + (optional) enquiry creation succeed */
  onAuthSuccess?: (user: User, enquiryCreated: boolean) => void;
  defaultTab?: 'login' | 'register';
  /** If provided, an enquiry is created automatically after auth */
  pendingProduct?: PendingProduct;
}

export default function LoginModal({
  isOpen,
  onClose,
  onAuthSuccess,
  defaultTab = 'login',
  pendingProduct,
}: LoginModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const loginStore = useUserStore((s) => s.login);

  useEffect(() => { if (isOpen) { setTab(defaultTab); setShowPass(false); } }, [isOpen, defaultTab]);
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [isOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // ── Shared: create enquiry right after auth using fresh token ──────────────

  const attemptEnquiry = async (token: string, user: User): Promise<boolean> => {
    if (!pendingProduct) return false;

    console.log('[LoginModal] Creating enquiry for product:', pendingProduct.name);
    console.log('[LoginModal] User:', { id: user._id, name: user.name, email: user.email });

    try {
      const res = await productEnquiryApi.createWithToken(
        {
          productId: pendingProduct._id,
          productName: pendingProduct.name,
          productCategory: pendingProduct.category,
          productPrice: pendingProduct.price?.toString() || '',
        },
        token
      );
      console.log('[LoginModal] Enquiry created successfully:', res.data?._id);
      return true;
    } catch (err: any) {
      console.error('[LoginModal] Enquiry creation failed:', err.response?.data || err.message);
      // Don't block the user flow — log and continue
      toast.error('Enquiry could not be saved. Please try again from the product page.');
      return false;
    }
  };

  // ── Login form ─────────────────────────────────────────────────────────────

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email.trim()) { toast.error('Email is required'); return; }
    if (!loginData.password) { toast.error('Password is required'); return; }

    try {
      setSubmitting(true);
      const res = await userApi.login(loginData.email.trim(), loginData.password);
      const { token, user } = res.data;

      console.log('[LoginModal] Login successful. User:', user.name);

      // Store in Zustand + localStorage
      loginStore(user, token);

      // Create enquiry immediately with fresh token (if Shop Now triggered this)
      const enquiryCreated = await attemptEnquiry(token, user);

      toast.success(`Welcome back, ${user.name}!`);
      onAuthSuccess?.(user, enquiryCreated);
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Register form ──────────────────────────────────────────────────────────

  const [regData, setRegData] = useState({
    name: '', email: '', mobile: '', password: '',
    city: '', state: '', country: 'India', organization: '',
  });

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.name.trim())          { toast.error('Name is required'); return; }
    if (!regData.email.trim())         { toast.error('Email is required'); return; }
    if (!regData.mobile.trim())        { toast.error('Mobile number is required'); return; }
    if (regData.password.length < 6)   { toast.error('Password must be at least 6 characters'); return; }

    try {
      setSubmitting(true);

      console.log('[LoginModal] Registering user:', regData.email);

      const res = await userApi.register(regData);
      const { token, user } = res.data;

      console.log('[LoginModal] Registration successful. User:', user.name, '| ID:', user._id);

      // Store in Zustand + localStorage
      loginStore(user, token);

      // Create enquiry immediately with fresh token (if Shop Now triggered this)
      const enquiryCreated = await attemptEnquiry(token, user);

      toast.success(`Welcome, ${user.name}! Account created successfully.`);
      onAuthSuccess?.(user, enquiryCreated);
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
              initial={{ scale: 0.93, y: 28 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 28 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl bg-white px-6 pt-6 pb-0">
                <div>
                  <h2 className="text-2xl font-bold text-dark-900">
                    {tab === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  {pendingProduct && (
                    <p className="mt-1 text-xs text-primary-600 font-medium">
                      Submitting enquiry for: {pendingProduct.name}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-100 text-dark-600 transition hover:bg-dark-200"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="px-6 pt-4 pb-2">
                <div className="flex rounded-xl bg-dark-100 p-1">
                  {(['login', 'register'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition ${
                        tab === t ? 'bg-white shadow text-primary-700' : 'text-dark-500 hover:text-dark-700'
                      }`}
                    >
                      {t === 'login' ? 'Login' : 'Register'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                {/* ── Login ── */}
                {tab === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Field icon={<FiMail />} label="Email Address" required>
                      <input
                        type="email" value={loginData.email}
                        onChange={(e) => setLoginData((p) => ({ ...p, email: e.target.value }))}
                        className={INPUT} placeholder="you@example.com"
                      />
                    </Field>
                    <Field icon={<FiLock />} label="Password" required>
                      <PasswordInput
                        value={loginData.password}
                        onChange={(v) => setLoginData((p) => ({ ...p, password: v }))}
                        show={showPass} onToggleShow={() => setShowPass((p) => !p)}
                      />
                    </Field>
                    <SubmitBtn loading={submitting}>
                      {pendingProduct ? 'Login & Submit Enquiry' : 'Login'}
                    </SubmitBtn>
                    <p className="text-center text-sm text-dark-500">
                      Don&apos;t have an account?{' '}
                      <button type="button" onClick={() => setTab('register')} className="font-semibold text-primary-600 hover:underline">
                        Register
                      </button>
                    </p>
                  </form>
                )}

                {/* ── Register ── */}
                {tab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <Field icon={<FiUser />} label="Full Name" required>
                      <input name="name" value={regData.name} onChange={handleRegChange} className={INPUT} placeholder="John Doe" />
                    </Field>
                    <Field icon={<FiMail />} label="Email Address" required>
                      <input name="email" type="email" value={regData.email} onChange={handleRegChange} className={INPUT} placeholder="you@example.com" />
                    </Field>
                    <Field icon={<FiPhone />} label="Mobile Number" required>
                      <input name="mobile" type="tel" value={regData.mobile} onChange={handleRegChange} className={INPUT} placeholder="+91 98765 43210" />
                    </Field>
                    <Field icon={<FiLock />} label="Password" required>
                      <PasswordInput
                        name="password" value={regData.password}
                        onChange={(v) => setRegData((p) => ({ ...p, password: v }))}
                        show={showPass} onToggleShow={() => setShowPass((p) => !p)}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field icon={<FiMapPin />} label="City">
                        <input name="city" value={regData.city} onChange={handleRegChange} className={INPUT} placeholder="Mumbai" />
                      </Field>
                      <Field icon={<FiMapPin />} label="State">
                        <input name="state" value={regData.state} onChange={handleRegChange} className={INPUT} placeholder="Maharashtra" />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field icon={<FiMapPin />} label="Country">
                        <input name="country" value={regData.country} onChange={handleRegChange} className={INPUT} placeholder="India" />
                      </Field>
                      <Field icon={<FiBriefcase />} label="Organization">
                        <input name="organization" value={regData.organization} onChange={handleRegChange} className={INPUT} placeholder="Company (optional)" />
                      </Field>
                    </div>
                    <SubmitBtn loading={submitting}>
                      {pendingProduct ? 'Register & Submit Enquiry' : 'Create Account'}
                    </SubmitBtn>
                    <p className="text-center text-sm text-dark-500">
                      Already have an account?{' '}
                      <button type="button" onClick={() => setTab('login')} className="font-semibold text-primary-600 hover:underline">
                        Login
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Shared sub-components ──────────────────────────────────────────────────────

const INPUT =
  'w-full rounded-xl border border-dark-300 bg-white px-4 py-2.5 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition';

function Field({ icon, label, required, children }: {
  icon: React.ReactNode; label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-dark-600">
        <span className="text-primary-500">{icon}</span>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function PasswordInput({ value, onChange, show, onToggleShow, name }: {
  value: string; onChange: (v: string) => void;
  show: boolean; onToggleShow: () => void; name?: string;
}) {
  return (
    <div className="relative">
      <input
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT + ' pr-10'}
        placeholder="Min. 6 characters"
      />
      <button
        type="button"
        onClick={onToggleShow}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"
      >
        {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
      </button>
    </div>
  );
}

function SubmitBtn({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit" disabled={loading}
      className="mt-2 w-full rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}
