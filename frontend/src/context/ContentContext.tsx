'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { About, Contact } from '@/types';

interface ContentContextType {
  about: About | null;
  contact: Contact | null;
  setAbout: (about: About | null) => void;
  setContact: (contact: Contact | null) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [about, setAbout] = useState<About | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);

  return (
    <ContentContext.Provider value={{ about, contact, setAbout, setContact }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}
