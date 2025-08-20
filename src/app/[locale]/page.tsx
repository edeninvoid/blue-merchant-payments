import MerchantListPage from '@/components/merchants/MerchantListPage';

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <MerchantListPage locale={locale} />;
}
