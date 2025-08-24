import OrderPage from '@/components/order/OrderPage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTranslations('OrderStatusPage');
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

export default async function OrderStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; status: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, status } = await params;
  const searchParameters = await searchParams;

  setRequestLocale(locale);

  return <OrderPage status={status} searchParams={searchParameters} />;
}
