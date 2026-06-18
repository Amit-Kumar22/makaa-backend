import axios from 'axios';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000');

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Attach whichever auth token is available (admin takes priority for admin routes)
api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');
  const token = adminToken || userToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Separate axios instance that ALWAYS uses the user token (for user-only endpoints)
export const userApi_instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
userApi_instance.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  const token = localStorage.getItem('userToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Product APIs
export const productApi = {
  getAll: () => api.get('/api/products'),
  getActive: () => api.get('/api/products/active'),
  getAdminAll: () => api.get('/api/products/admin'),
  getById: (id: string) => api.get(`/api/products/${id}`),
  create: (data: any) => api.post('/api/products', data),
  update: (id: string, data: any) => api.put(`/api/products/${id}`, data),
  delete: (id: string) => api.delete(`/api/products/${id}`),
  uploadImage: (formData: FormData) =>
    api.post('/api/products/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};


// Why Choose Us APIs
export const whyChooseUsApi = {
  getAll: () => api.get('/api/why-choose-us'),
  getAdminAll: () => api.get('/api/why-choose-us/admin'),
  getById: (id: string) => api.get(`/api/why-choose-us/${id}`),
  create: (data: any) => api.post('/api/why-choose-us', data),
  update: (id: string, data: any) => api.put(`/api/why-choose-us/${id}`, data),
  delete: (id: string) => api.delete(`/api/why-choose-us/${id}`),
  uploadImage: (formData: FormData) =>
    api.post('/api/why-choose-us/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};


// Certification APIs
export const certificationApi = {
  getAll: () => api.get('/api/certifications'),
  getAdminAll: () => api.get('/api/certifications/admin'),
  getById: (id: string) => api.get(`/api/certifications/${id}`),
  create: (data: any) => api.post('/api/certifications', data),
  update: (id: string, data: any) => api.put(`/api/certifications/${id}`, data),
  delete: (id: string) => api.delete(`/api/certifications/${id}`),
  uploadImage: (formData: FormData) =>
    api.post('/api/certifications/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadPdf: (formData: FormData) =>
    api.post('/api/certifications/upload-pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Enquiry APIs
export const enquiryApi = {
  create: (data: any) => api.post('/api/enquiry', data),
  getAll: () => api.get('/api/enquiry'),
  delete: (id: string) => api.delete(`/api/enquiry/${id}`),
  markContacted: (id: string) => api.patch(`/api/enquiry/${id}`, { contacted: true }),
};

// About APIs
export const aboutApi = {
  get: () => api.get('/api/about'),
  update: (data: any) => api.put('/api/about', data),
};

// Contact APIs
export const contactApi = {
  get: () => api.get('/api/contact'),
  update: (data: any) => api.put('/api/contact', data),
};

// Auth APIs (admin)
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
};

// User auth APIs
export const userApi = {
  register: (data: any) => api.post('/api/users/register', data),
  login: (email: string, password: string) => api.post('/api/users/login', { email, password }),
  getProfile: () => userApi_instance.get('/api/users/profile'),
  updateProfile: (data: any) => userApi_instance.put('/api/users/profile', data),
};

// Product enquiry APIs
export const productEnquiryApi = {
  // Use fresh token directly (called right after login/register) — no localStorage race condition
  createWithToken: (data: any, token: string) =>
    axios.post(`${API_URL}/api/product-enquiries`, data, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    }),
  // Fallback: reads token from localStorage (for use when user is already logged in)
  create: (data: any) => userApi_instance.post('/api/product-enquiries', data),
  getAll: (params?: Record<string, any>) => api.get('/api/product-enquiries', { params }),
  getById: (id: string) => api.get(`/api/product-enquiries/${id}`),
  updateStatus: (id: string, data: { status?: string; notes?: string }) =>
    api.patch(`/api/product-enquiries/${id}`, data),
  delete: (id: string) => api.delete(`/api/product-enquiries/${id}`),
};

// Admin Stats
export const adminApi = {
  getStats: () => api.get('/api/admin/stats'),
};

export default api;
