import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface HeaderState {
  title: string;
  setTitle: (title: string) => void;
}

export const useHeaderTitleStore = create<HeaderState>()(
  devtools(
    set => ({
      title: 'Merchants',
      setTitle: title => set({ title }),
    }),
    { name: 'HeaderTitleStore' },
  ),
);
