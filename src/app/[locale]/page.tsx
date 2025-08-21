import MerchantListPage from '@/components/merchants/list/MerchantListPage';
import { Metadata, ResolvingMetadata } from 'next';

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <MerchantListPage locale={locale} />;
}

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: 'Blue Payments | Merchants',
    description: 'Blue Payments',
    openGraph: {
      title: 'Blue Payments | Merchants',
      images: [...previousImages],
    },
  };
}
