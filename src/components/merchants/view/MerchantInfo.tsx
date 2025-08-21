import { useMerchantInfoQuery } from '@/lib/hooks/useMerchants';
import { useSetHeaderTitle } from '@/lib/hooks/useHeader';
import MerchantInfoError from '@/components/merchants/view/MerchantInfoError';
import Image from 'next/image';
import MapIcon from '@/components/_icons/Map';
import PhoneIcon from '@/components/_icons/Phone';

interface Props {
  merchantId: string;
}

export default function MerchantInfo({ merchantId }: Props) {
  const { data: info, status } = useMerchantInfoQuery(merchantId);
  useSetHeaderTitle(info.name);

  // 응답에 따른 에러 처리 분기
  if (status === 'error') return <MerchantInfoError />;

  return (
    <section
      aria-labelledby={`merchant-${merchantId}`}
      className="flex flex-col gap-3 p-2"
    >
      <h2 id={`merchant-${merchantId}`} className="sr-only">
        {info.name}
      </h2>
      <div className="flex gap-4">
        <Image src="/icons/coffee.svg" alt={'coffee'} width={50} height={50} />
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{info.name}</h3>
          <p className="text-sm">{info.description}</p>
        </div>
      </div>
      <dl className="flex flex-col gap-1">
        <dt className="sr-only">Address</dt>
        <dd className="flex items-center gap-1 text-sm">
          <MapIcon />
          {info.address}
        </dd>
        <dt className="sr-only">Phone</dt>
        <dd className="flex items-center gap-1 text-sm">
          <PhoneIcon />
          {info.phone}
        </dd>
      </dl>
    </section>
  );
}
