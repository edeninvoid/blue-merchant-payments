import { create } from 'zustand';
import { AuthTokenData } from '@/types/auth';

interface AuthState {
  token: AuthTokenData | null;
  setToken: (token: AuthTokenData) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  setToken: token => set({ token }),
  clearToken: () => set({ token: null }),
}));
