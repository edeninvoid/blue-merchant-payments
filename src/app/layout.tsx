import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BluePayments',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
