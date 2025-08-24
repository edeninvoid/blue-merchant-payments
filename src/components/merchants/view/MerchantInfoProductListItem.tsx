import { MerchantProductItem } from '@/types/merchant';
import { memo } from 'react';
import { formattedPrice } from '@/lib/utils';
import { useMerchantsProductsStore } from '@/store/merchants';
import { useLocale } from 'next-intl';
import clsx from 'clsx';

interface Props {
  item: MerchantProductItem;
}

function MerchantInfoProductListItemComponent({ item }: Props) {
  const locale = useLocale();
  const onCheckChange = useMerchantsProductsStore(state => state.toggleProduct);
  return (
    <li>
      <label
        htmlFor={`product-${item.id}`}
        className="flex items-center gap-2 px-3 py-2 text-xs"
      >
        <input
          type="checkbox"
          id={`product-${item.id}`}
          checked={item.isChecked}
          onChange={e => onCheckChange(item.id, e.target.checked)}
        />
        <div className="flex flex-1 cursor-pointer items-center justify-between">
          <span className="text-sm">{item.name}</span>
          <span
            className={clsx(
              'flex justify-baseline',
              locale === 'en' ? 'flex-col' : 'gap-0.5',
            )}
          >
            <span className="font-semibold">
              {formattedPrice(item.price, locale)}
            </span>
            {/*<span>{item.currency}</span>*/}
            <span>{locale === 'ko' ? '원' : 'USD'}</span>
          </span>
        </div>
      </label>
    </li>
  );
}

const MerchantInfoProductListItem = memo(MerchantInfoProductListItemComponent);

export { MerchantInfoProductListItem };
