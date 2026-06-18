import { create } from 'zustand';
import { User } from '@/types';

interface UserState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  /** Call this once on app mount to rehydrate from localStorage */
  hydrate: () => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  hydrate: () => {
    if (typeof window === 'undefined') return;
    try {
      const token = localStorage.getItem('userToken');
      const raw = localStorage.getItem('userData');
      if (token && raw) {
        const user: User = JSON.parse(raw);
        set({ user, token, isLoggedIn: true });
      }
    } catch {
      // ignore malformed data
    }
  },

  login: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
    }
    set({ user, token, isLoggedIn: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
    }
    set({ user: null, token: null, isLoggedIn: false });
  },

  setUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(user));
    }
    set({ user });
  },
}));
