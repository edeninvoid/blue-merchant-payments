'use client';

import { useGenerateToken } from '@/lib/hooks/useGenerateToken';
import Providers from '@/lib/providers';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useGenerateToken('device-id');

  return <Providers>{children}</Providers>;
}
