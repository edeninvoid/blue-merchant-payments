import { MerchantProductItem } from '@/types/merchant';
import { memo } from 'react';
import { formattedPrice } from '@/lib/utils';

interface Props {
  item: MerchantProductItem;
  onCheckChange: (id: number, checked: boolean) => void;
}

function MerchantInfoProductListItemComponent({ item, onCheckChange }: Props) {
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
          <span className="flex flex-col justify-baseline">
            <span className="font-semibold">${formattedPrice(item.price)}</span>
            <span>{item.currency}</span>
          </span>
        </div>
      </label>
    </li>
  );
}

const MerchantInfoProductListItem = memo(MerchantInfoProductListItemComponent);

export { MerchantInfoProductListItem };
