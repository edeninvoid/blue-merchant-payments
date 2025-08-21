'use client';

import { LocaleContext } from '@/lib/contexts/LocaleContext';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import Loading from '@/components/_ui/loading';
import { Suspense } from 'react';
import MerchantInfo from '@/components/merchants/view/MerchantInfo';
import MerchantInfoProducts from '@/components/merchants/view/MerchantInfoProducts';

interface Props {
  locale: string;
  merchantId: string;
}

export default function MerchantInfoPage({ locale, merchantId }: Props) {
  return (
    <LocaleContext value={locale as keyof typeof SUPPORTED_LANGUAGES}>
      <Suspense fallback={<Loading />}>
        <MerchantInfo merchantId={merchantId} />
        <MerchantInfoProducts merchantId={merchantId} />
      </Suspense>
    </LocaleContext>
  );
}
