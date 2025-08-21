import MerchantListContainer from '@/components/merchants/list/MerchantListContainer';
import { MerchantListSkeletonItem } from '@/components/merchants/list/MerchantListItem';

export default function MerchantListSkeleton() {
  return (
    <MerchantListContainer>
      {Array.from({ length: 12 }).map((_, i) => (
        <MerchantListSkeletonItem key={i} />
      ))}
    </MerchantListContainer>
  );
}
