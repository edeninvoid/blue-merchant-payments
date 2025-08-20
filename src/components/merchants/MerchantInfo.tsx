import { useMerchantInfoQuery } from '@/lib/hooks/useMerchants';
import { useSetHeaderTitle } from '@/lib/hooks/useHeader';
import MerchantInfoError from '@/components/merchants/MerchantInfoError';
import Image from 'next/image';
import MapIcon from '@/components/_icons/Map';
import PhoneIcon from '@/components/_icons/Phone';

interface Props {
  id: string;
}

export default function MerchantInfo({ id }: Props) {
  const { data: info, status } = useMerchantInfoQuery(id);
  useSetHeaderTitle(info.name);

  if (status === 'error') return <MerchantInfoError />;

  return (
    <section aria-labelledby={info.name} className="flex flex-col gap-3 p-2">
      <h2 id={`merchant-${id}`} className="sr-only">
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
        <div>
          <dt className="sr-only">Address</dt>
          <dd className="flex items-center gap-1 text-sm">
            <MapIcon />
            {info.address}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Phone</dt>
          <dd className="flex items-center gap-1 text-sm">
            <PhoneIcon />
            {info.phone}
          </dd>
        </div>
      </dl>
    </section>
  );
}
