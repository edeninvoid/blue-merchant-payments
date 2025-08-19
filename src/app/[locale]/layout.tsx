import ClientLayout from '@/app/client-layout';
import { MSWInitializer } from '@/lib/providers/MSWInitializer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="vsc-initialize" cz-shortcut-listen="true">
        <MSWInitializer>
          <ClientLayout>{children}</ClientLayout>
        </MSWInitializer>
      </body>
    </html>
  );
}
