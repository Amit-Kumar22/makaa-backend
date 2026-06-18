export interface Product {
  _id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  price?: number | null;
  discountPrice?: number | null;
  features?: string[];
  isActive: boolean;
  grade?: string;
  moisture?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  productRequirement: string;
  message: string;
  contacted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface About {
  _id: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
  image: string;
}

export interface Contact {
  _id: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  googleMapEmbed: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface AdminUser {
  _id: string;
  email: string;
  name: string;
}

export interface Certification {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  pdfUrl?: string;
  pdfName?: string;
  pdfSize?: number;
  certificateNumber?: string;
  recipientName?: string;
  issueDate?: string;
  expiryDate?: string;
  organizationName?: string;
  certStatus?: 'Active' | 'Expired' | 'Pending' | 'N/A';
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  city?: string;
  state?: string;
  country?: string;
  organization?: string;
  createdAt: string;
}

export type ProductEnquiryStatus = 'New' | 'Contacted' | 'Follow Up' | 'Interested' | 'Converted' | 'Closed';

export interface ProductEnquiry {
  _id: string;
  userId: string;
  productId?: string;
  productName: string;
  productCategory?: string;
  productPrice?: string;
  userName: string;
  mobile: string;
  email: string;
  city?: string;
  state?: string;
  organizationName?: string;
  status: ProductEnquiryStatus;
  notes?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface WhyChooseUsItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
