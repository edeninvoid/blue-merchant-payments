import OrderPage from '@/components/order/OrderPage';

export default async function OrderStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; status: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, status } = await params;
  const searchParameters = await searchParams;

  return (
    <OrderPage
      locale={locale}
      status={status}
      searchParams={searchParameters}
    />
  );
}
