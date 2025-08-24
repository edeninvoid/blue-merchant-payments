import { MerchantListItemInfo } from '@/types/merchant';
import Image from 'next/image';
import { memo } from 'react';
import { replaceRatingToStar } from '@/lib/utils';
import { Skeleton } from '@/components/_ui/skeleton';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

function MerchantListItemComponent({ item }: { item: MerchantListItemInfo }) {
  const locale = useLocale();
  return (
    <li>
      <Link href={`/merchant/${item.id}`} locale={locale} className="block">
        <article className="flex items-center justify-between rounded-lg bg-white px-4 py-2 hover:bg-neutral-200 hover:shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <div className="grid grid-cols-[40px_1fr] items-center gap-4">
            <Image
              src={item.logoUrl}
              width={40}
              height={40}
              alt={item.name}
              loading="lazy"
            />
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm">{item.category}</p>
            </div>
          </div>
          <dl className="flex flex-col items-end gap-1 text-sm">
            <div>
              <dt className="sr-only">Distance</dt>
              <dd>{item.distanceKm} km</dd>
            </div>
            <div>
              <dt className="sr-only">Rating</dt>
              <dd aria-label={`Rating: ${item.rating} out of 5`}>
                {replaceRatingToStar(item.rating)}
              </dd>
            </div>
          </dl>
        </article>
      </Link>
    </li>
  );
}

const MerchantListItem = memo(MerchantListItemComponent);

function MerchantListSkeletonItem() {
  return (
    <li>
      <article className="flex items-center justify-between rounded-lg bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </article>
    </li>
  );
}

export { MerchantListItem, MerchantListSkeletonItem };
