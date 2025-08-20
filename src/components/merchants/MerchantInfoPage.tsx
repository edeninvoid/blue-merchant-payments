'use client';

import { LocaleContext } from '@/lib/contexts/LocaleContext';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import Loading from '@/components/_ui/loading';
import { Suspense } from 'react';
import MerchantInfo from '@/components/merchants/MerchantInfo';

interface Props {
  locale: string;
  id: string;
}

export default function MerchantInfoPage({ locale, id }: Props) {
  return (
    <LocaleContext value={locale as keyof typeof SUPPORTED_LANGUAGES}>
      <Suspense fallback={<Loading />}>
        <MerchantInfo id={id} />
      </Suspense>
    </LocaleContext>
  );
}
