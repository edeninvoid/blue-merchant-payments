import Link from 'next/link';

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {locale} <Link href="/ko/merchant/list">merchantlistt</Link>
    </>
  );
}
