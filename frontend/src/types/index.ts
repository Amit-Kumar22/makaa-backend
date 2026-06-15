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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
