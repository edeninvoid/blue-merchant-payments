import MerchantInfoPage from '@/components/merchants/view/MerchantInfoPage';
import { setRequestLocale } from 'next-intl/server';

export default async function MerchantViewPage({
  params,
}: {
  params: Promise<{ locale: string; merchantId: string }>;
}) {
  const { locale, merchantId } = await params;

  setRequestLocale(locale);

  return <MerchantInfoPage merchantId={merchantId} />;
}
