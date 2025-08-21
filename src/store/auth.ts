import { create } from 'zustand';
import { AuthTokenData } from '@/types/auth';
import { devtools } from 'zustand/middleware';

interface AuthTokenStore {
  token: AuthTokenData | null;
  setToken: (token: AuthTokenData) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthTokenStore>()(
  devtools(
    set => ({
      token: null,
      setToken: token => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    { name: 'AuthTokenStore' },
  ),
);
