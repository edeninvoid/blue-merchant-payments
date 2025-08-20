import MerchantInfoPage from '@/components/merchants/MerchantInfoPage';

export default async function MerchantViewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;

  console.log(locale);
  return <MerchantInfoPage id={id} />;
}
