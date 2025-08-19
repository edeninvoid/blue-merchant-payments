'use client';

import { useEffect, useState } from 'react';

export const MSWInitializer = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const initializeMSW = await import('@/mocks/init').then(
        res => res.initializeMockService,
      );

      await initializeMSW();

      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) return null;

  return <>{children}</>;
};
