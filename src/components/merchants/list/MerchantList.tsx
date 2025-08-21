import { useMerchantListQuery } from '@/lib/hooks/useMerchants';
import MerchantListContainer from '@/components/merchants/list/MerchantListContainer';
import {
  MerchantListItem,
  MerchantListSkeletonItem,
} from '@/components/merchants/list/MerchantListItem';
import { MerchantListRequestParams } from '@/types/merchant';
import MerchantListNoItem from '@/components/merchants/list/MerchantListNoItem';

function MerchantList({
  params,
}: {
  params: MerchantListRequestParams | undefined;
}) {
  const { data: merchantListData } = useMerchantListQuery(params);

  if (!merchantListData || merchantListData.length === 0)
    return <MerchantListNoItem />;

  return (
    <MerchantListContainer>
      {merchantListData?.map(merchantItem => (
        <MerchantListItem key={merchantItem.id} item={merchantItem} />
      ))}
    </MerchantListContainer>
  );
}

function MerchantSkeletonList() {
  return (
    <MerchantListContainer>
      {Array.from({ length: 12 }).map((_, i) => (
        <MerchantListSkeletonItem key={i} />
      ))}
    </MerchantListContainer>
  );
}

export { MerchantList, MerchantSkeletonList };
