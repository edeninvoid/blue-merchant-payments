import MerchantInfoPage from '@/components/merchants/view/MerchantInfoPage';

export default async function MerchantViewPage({
  params,
}: {
  params: Promise<{ locale: string; merchantId: string }>;
}) {
  const { locale, merchantId } = await params;

  return <MerchantInfoPage locale={locale} merchantId={merchantId} />;
}
