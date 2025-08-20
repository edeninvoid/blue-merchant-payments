import { create } from 'zustand';

interface HeaderState {
  title: string;
  setTitle: (title: string) => void;
}

export const useHeaderTitleStore = create<HeaderState>(set => ({
  title: 'MerchantsPage',
  setTitle: title => set({ title }),
}));
