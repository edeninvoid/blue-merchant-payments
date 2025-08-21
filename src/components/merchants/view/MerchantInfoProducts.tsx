import { useMerchantsProducts } from '@/lib/hooks/useMerchants';
import { MerchantInfoProductListItem } from '@/components/merchants/view/MerchantInfoProductListItem';
import { formattedPrice, getPushUrl } from '@/lib/utils';
import { usePostOrders } from '@/lib/hooks/useOrders';
import { CURRENCY } from '@/lib/constants';
import { useLocaleContext } from '@/lib/contexts/LocaleContext';
import { useRouter } from 'next/navigation';
import { PostOrderRequestParams } from '@/types/orders';
import { useMerchantsProductsStore } from '@/store/merchants';
import Loading from '@/components/_ui/loading';

interface Props {
  merchantId: string;
}

export default function MerchantInfoProducts({ merchantId }: Props) {
  const { push } = useRouter();
  const locale = useLocaleContext();
  const { isLoading } = useMerchantsProducts(merchantId);

  const productList = useMerchantsProductsStore(state => state.productList);
  const totalPrice = useMerchantsProductsStore(state =>
    state.productList
      .filter(item => item.isChecked)
      .reduce((sum, item) => sum + item.price, 0),
  );

  const { mutateAsync: postOrders } = usePostOrders();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postOrderRequestParams: PostOrderRequestParams = {
      merchantId: merchantId,
      currency: CURRENCY[locale],
      amount: totalPrice.toString(),
    };

    try {
      const postOrderResponse = await postOrders(postOrderRequestParams);
      push(getPushUrl(locale, postOrderRequestParams, postOrderResponse));
    } catch (error) {
      console.error('Order Failed.', error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby={`products-title-${merchantId}`}
      className="flex flex-col gap-2 p-2"
    >
      <h3 id={`products-title-${merchantId}`} className="font-semibold">
        Products
      </h3>
      <ul className="grid grid-cols-1 rounded bg-white">
        {productList?.map(product => (
          <MerchantInfoProductListItem key={product.id} item={product} />
        ))}
      </ul>
      <button
        type="submit"
        aria-label={`Pay $${formattedPrice(totalPrice)} for selected products`}
        className="mt-2 h-10 w-full rounded bg-neutral-600 font-semibold text-white hover:cursor-pointer hover:bg-neutral-400 disabled:cursor-not-allowed disabled:bg-gray-200"
        disabled={!totalPrice || totalPrice === 0}
      >
        Pay $ {formattedPrice(totalPrice)}
      </button>
    </form>
  );
}
