'use client';

import { useAuthExpiration, useGenerateToken } from '@/lib/hooks/useToken';
import Providers from '@/lib/providers';
import Header from '@/components/_layouts/Header';
import Loading from '@/components/_ui/loading';
import Footer from '@/components/_layouts/Footer';

export default function ClientLocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthExpiration();
  const { isLoading } = useGenerateToken('device-id');

  if (isLoading) return <Loading />;

  return (
    <Providers>
      <Header />
      <main className="m-2">{children}</main>
      <Footer />
    </Providers>
  );
}
