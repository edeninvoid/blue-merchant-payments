'use client';

import { useGenerateToken } from '@/lib/hooks/useGenerateToken';
import Providers from '@/lib/providers';
import Header from '@/components/_layouts/Header';
import Loading from '@/components/_ui/loading';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useGenerateToken('device-id');

  if (isLoading) return <Loading />;

  return (
    <Providers>
      <Header />
      <main className="m-2">{children}</main>
    </Providers>
  );
}
