import axios from 'axios';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000');

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('adminToken')
    : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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

// Auth APIs
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
};

// Admin Stats
export const adminApi = {
  getStats: () => api.get('/api/admin/stats'),
};

export default api;
