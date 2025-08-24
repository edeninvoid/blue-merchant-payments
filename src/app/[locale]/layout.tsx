import ClientLayout from '@/app/[locale]/client-layout';
import { MSWInitializer } from '@/lib/providers/MSWInitializer';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body className="vsc-initialize" cz-shortcut-listen="true">
        <MSWInitializer>
          <NextIntlClientProvider>
            <ClientLayout>{children}</ClientLayout>
          </NextIntlClientProvider>
        </MSWInitializer>
      </body>
    </html>
  );
}
