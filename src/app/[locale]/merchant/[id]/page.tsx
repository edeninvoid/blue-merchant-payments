import MerchantInfoPage from '@/components/merchants/MerchantInfoPage';

export default async function MerchantViewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;

  return <MerchantInfoPage locale={locale} id={id} />;
}
