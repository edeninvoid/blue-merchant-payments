import ClientLayout from '@/app/[locale]/client-layout';
import { MSWInitializer } from '@/lib/providers/MSWInitializer';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTranslations('LocaleLayout');
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      images: [...previousImages],
    },
  };
}

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
      <body className="vsc-initialize">
        <MSWInitializer>
          <NextIntlClientProvider>
            <ClientLayout>{children}</ClientLayout>
          </NextIntlClientProvider>
        </MSWInitializer>
      </body>
    </html>
  );
}
